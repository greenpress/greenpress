import {computed, reactive, ref, toRef} from 'vue'
import menusService from '../../../services/menus-service'

import {useSubmitting} from '../../core/compositions/submitting'
import {useDispatcher} from '../../core/compositions/dispatcher'

function getMenu(menuName: string) {
  if (!menuName) {
    return ref({isNew: true, links: []});
  }
  const {result: menu} = useDispatcher<{ _id: string, name: string, links: any[] } | any>(() => menusService.getOne(menuName), {})
  return menu;
}

export function useMenuOperations(menuName: string) {
  const menu = getMenu(menuName);

  const updatedMenu = reactive<{ links: any[], dirty: boolean, name?: string }>({
    links: [],
    dirty: false
  })
  const links = computed<any[]>(() => updatedMenu.dirty ? updatedMenu.links : (menu.value.links || []))
  let submitFn;
  if (menu.value.isNew) {
    updatedMenu.name = 'New Menu';
    submitFn = () => menusService.create({
      name: updatedMenu.name,
      links: links.value
        .map(link => link._id.startsWith('new-') ? {...link, _id: undefined} : link)
    })
  } else {
    submitFn = () => menusService.update(menuName, {
      ...menu.value,
      links: links.value
        .map(link => link._id.startsWith('new-') ? {...link, _id: undefined} : link)
    })
  }

  return {
    links,
    name: toRef(updatedMenu, 'name'),
    updateLink: (link) => {
      updatedMenu.links = [...links.value.map(l => l._id === link._id ? link : l)]
      updatedMenu.dirty = true
    },
    removeLink: (link) => {
      updatedMenu.links = [...links.value.filter(l => l !== link)]
      updatedMenu.dirty = true
    },
    addLink: () => {
      updatedMenu.links = [...links.value, {kind: 'category', _id: 'new-' + Date.now()}]
      updatedMenu.dirty = true
    },
    updateMenu: useSubmitting(submitFn, {success: 'Menu updated successfully', error: 'Failed to update menu'}).submit
  }
}

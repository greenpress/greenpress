import {onMounted, ref} from 'vue';
import {IOnCreateEventDetail} from '@greenpress/view-builder/src';

export function useLayoutBuilder({content, connectedData, layout}) {
    const builder = ref();
    const editedItem = ref<IOnCreateEventDetail>(null)

    function onChangeItem(event) {
        content.value = event.detail.layout.content;
    }

    function onCreateItem(e) {
        const detail: IOnCreateEventDetail = e.detail;
        const plugin = detail.plugin;
        if (!plugin) {
            return;
        }
        if (plugin.connectedData) {
            const existingReference = connectedData.value.find(cd => cd.reference === plugin.connectedData.reference);
            if (!existingReference) {
                connectedData.value = connectedData.value.concat([plugin.connectedData]);
            }
        }
    }

    function onEditItem(event) {
        editedItem.value = event.detail;
    }

    function onChangeContent({ props, classes }) {
        const itemContent = editedItem.value.content;
        if (props) {
            itemContent.props = props;
        }
        itemContent.classes = classes;

        editedItem.value.target.content = itemContent;
        content.value = builder.value.layout.content;
        editedItem.value = null;
    }

    const contentDisplayElement = ({content, plugin}) => {
        const div = document.createElement('div');

        if(content.props) {
            div.innerHTML = 'Properties: ' + JSON.stringify(content.props);
            return div;
        }

        return null;
    }

    onMounted(() => {
        builder.value.setContentDisplayCreator(contentDisplayElement);
        builder.value.layout = layout.value;
    })

    return {
        builder,
        editedItem,
        onChangeItem,
        onCreateItem,
        onEditItem,
        onChangeContent,
    }
}

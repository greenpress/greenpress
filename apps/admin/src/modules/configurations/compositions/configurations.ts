import {useDispatcher} from '../../core/compositions/dispatcher';
import configurationsService from '../../../services/configurations-service';

export function useConfigurationsList() {
  const {result} = useDispatcher(() => configurationsService.getAll())
  return {
    list: result
  }
}

export function useConfiguration(key: string) {
  const {result} = useDispatcher(() => configurationsService.getOne(key))
  return {
    config: result
  }
}

export function useEditConfiguration(key: string) {
  return {
    ...useConfiguration(key),
    updateConfiguration: (payload) => configurationsService.update(key, payload)
  }
}

import { rm } from 'fs/promises'


try {
  await rm('./dist', { recursive: true });
} catch {
  console.log('dist folder not found')
}

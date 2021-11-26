import { rmdir } from 'fs/promises'


await rmdir('./dist', { recursive: true });

import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const requiredPaths = [
  'node_modules',
  'node_modules/react',
  'node_modules/react-dom',
  'node_modules/vite',
]

const hasDependencies = requiredPaths.every((path) => existsSync(path))

if (hasDependencies) {
  process.exit(0)
}

console.log('Dependencias no encontradas. Instalando con npm ci...')

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npmCommand, ['ci'], {
  stdio: 'inherit',
  shell: false,
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

console.log('Dependencias instaladas. Continuando...')

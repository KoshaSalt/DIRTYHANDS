import './style.css'
import { Nostalgist } from 'nostalgist'
import { updateGames, on, activate } from './utils'

let nostalgist

on('click', 'button.btn', async (event) => {
  const { system, game } = event.target.dataset
  switch (system) {
    case 'nes':
      nostalgist = await Nostalgist.nes(game)
      break
    case 'snes':
      nostalgist = await Nostalgist.snes(game)
      break
    case 'gba':
      nostalgist = await Nostalgist.gba(game)
      break
    case 'gbc':
      nostalgist = await Nostalgist.gbc(game)
      break
    case 'md':
      nostalgist = await Nostalgist.megadrive(game)
      break
  }
})

addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    nostalgist?.exit()
  }
})

async function main() {
  await updateGames('nes')
  activate()
}

main()

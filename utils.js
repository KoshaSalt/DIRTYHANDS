async function getGameList(system) {
  const baseUrl = `https://cdn.jsdelivr.net/gh/retrobrews/${system}-games@master`
  const gamelistUrl = `${baseUrl}/gamelist.xml`
  const response = await fetch(gamelistUrl)
  const text = await response.text()
  const domParser = new DOMParser()
  const xml = domParser.parseFromString(text, 'text/xml')
  const gameNodes = [...xml.querySelectorAll('game')]
  const games = gameNodes.map((gameNode) => ({
    path: gameNode.querySelector('path').textContent.replace('./', ''),
    name: gameNode.querySelector('name').textContent,
    desc: gameNode.querySelector('desc').textContent,
    image: `${baseUrl}${gameNode
      .querySelector('image')
      .textContent.replace('./', '/')}`,
    developer: gameNode.querySelector('developer').textContent,
  }))
  return { system, games }
}

function render({ system, games }) {
  const tbody = document.querySelector('.table tbody')
  const tbodyHtml = games
    .map(
      (game) => `
    <tr>
      <td>
        <div class="d-flex">
          <div class="flex-shrink-0">
            <img class="img-thumbnail" src="${game.image}" alt="${game.name}">
          </div>
          <div class="ms-3">
            <p><strong>${game.name}</strong></p>
            <p class="small">developed by ${game.developer}</p>
            <p class="small text-muted">
              ${game.desc}
            </p>
          </div>
        </div>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-primary" data-system="${system}" data-game="${game.path}">
          Launch this game!
        </button>
      </td>
    </tr>
  `
    )
    .join('')
  tbody.innerHTML = tbodyHtml
}

const systemMap = {
  NES: 'nes',
  SNES: 'snes',
  GBC: 'gbc',
  GBA: 'gba',
  Genesis: 'md',
}

export async function updateGames(system) {
  const gameList = await getGameList(system)
  const currentSystem =
    systemMap[document.querySelector('.nav-link.active').textContent]
  const match = gameList.system === currentSystem
  if (match) {
    render(gameList)
  }
}

export function on(eventType, selector, listener) {
  document.body.addEventListener(eventType, (event) => {
    let target = event.target
    if (target && target.closest(selector)) {
      listener.call(this, event)
    }
  })
}

export function activate() {
  on('click', '.nav-link', async (e) => {
    if (e.target.classList.contains('active')) {
      return
    }
    document.querySelectorAll('.nav-link').forEach((node) => {
      if (node === e.target) {
        node.classList.add('active')
      } else {
        node.classList.remove('active')
      }
    })
    await updateGames(systemMap[e.target.textContent])
  })
}

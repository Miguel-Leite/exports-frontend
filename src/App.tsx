import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameController, MagnifyingGlassPlus } from 'phosphor-react'

import './styles/main.css';

import logoImg from './assets/logo-nlw-exports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { IGame } from './interfaces/IGame';
import { Input } from './components/Form/Input';

function App() {

  const [games, setGames] = useState<IGame[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo Exports" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>

        {games.map(game => (
          <GameBanner key={game.id} title={game.title} bannerUrl={game.bannerUrl} adsCount={game._count.ads} />
        ))}
      </div>

      {/* <div className='bg-[#2A2634] relative px-8 py-6 mt-8 self-stretch rounded-lg before:w-full before:h-2 before:bg-nlw-gradient before:absolute before:top-0 before:left-0 before:right-0'>
      </div> */}

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Input type="text" name="game" id="game" placeholder='Selecione o game que deseja jogar' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input type="text" name="name" id="name" placeholder='Como te chamam dentro do game?' />
              </div>
              <div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input type="text" name="yearsPlaying" id="yearsPlaying" placeholder='Tudo bem ser ZERO' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input type="text" name="discord" id="discord" placeholder='Usuário#0000' />
                </div>
                <div>
                  <div>
                    <label htmlFor="weekDays">Quando constuma jogar?</label>
                  </div>
                </div>
                <div>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div>
                    <Input id='hourStart' type="time" placeholder='De' />
                    <Input id='hourEnd' type="time" placeholder='Até' />
                  </div>
                </div>
              </div>

              <div>
                <input type="checkbox" />
                Constumo a me conectar ao chat de voz
              </div>

              <footer>
                <button>Cancelar</button>
                <button type="submit">
                  <GameController />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App

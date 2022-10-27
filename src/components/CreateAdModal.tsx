import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react'


import { Input } from './Form/Input';
import { IGameSelectForm } from '../interfaces/IGameSelectForm';

export function CreateAdModal() {

  const [games, setGames]       = useState<IGameSelectForm[]>([]);
  const [weekDays, setWeeDays]  = useState<string[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])


  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <form className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <select
              name="game"
              id="game"
              className='bg-zinc-900 py-3 px-4 rounded text-sm appearance-none'
              defaultValue=""
            >
              <option disabled value=""> Selecione o game que deseja jogar </option>
              {games.map(game => (
                <option value={game.id} key={game.id}>{game.title}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input type="text" name="name" id="name" placeholder='Como te chamam dentro do game?' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input type="text" name="yearsPlaying" id="yearsPlaying" placeholder='Tudo bem ser ZERO' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input type="text" name="discord" id="discord" placeholder='Usuário#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="weekDays">Quando constuma jogar?</label>


              <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' value={weekDays} onValueChange={setWeeDays}>
                <ToggleGroup.Item value='0' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Domingo'>D</ToggleGroup.Item>
                <ToggleGroup.Item value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Segunda-Feira'>S</ToggleGroup.Item>
                <ToggleGroup.Item value='2' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Terça-Feira'>T</ToggleGroup.Item>
                <ToggleGroup.Item value='3' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quarta-Feira'>Q</ToggleGroup.Item>
                <ToggleGroup.Item value='4' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quinta-Feira'>Q</ToggleGroup.Item>
                <ToggleGroup.Item value='5' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sexta-Feira'>S</ToggleGroup.Item>
                <ToggleGroup.Item value='6' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sábado'>S</ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input id='hourStart' type="time" placeholder='De' />
                <Input id='hourEnd' type="time" placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root className='w-6 h-6 rounded bg-zinc-900 p-1'>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Constumo a me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
            <button
              type="submit"
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex gap-3 items-center hover:bg-violet-600'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
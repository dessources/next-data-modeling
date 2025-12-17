// 🐶 Importe le Type `Todo` il nous sera utile pour typer les données reçues
import {Todo} from '@/lib/type'

// 🐶 Importe la classe `Client` elle nous permettra d'instancier un client `postgres`
import {Client} from 'pg'

async function getTodos() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_LOCAL,
  })

  const db = await client.connect()

  const {rows} = await client.query<Todo>(
    `SELECT id, title, iscompleted AS "isCompleted",  createdat AS "createdAt",  updatedat AS "updatedAt" from Todo`
  )
  // const rows = [
  //   {
  //     id: 1,
  //     title: 'Fake Data',
  //     isCompleted: false,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ]
  // 🐶 Déconnecte toi de la base de données avec
  // 🤖 await client.end()
  return rows
}

export default async function Page() {
  const rows = await getTodos()
  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo List</h1>
      {rows.map((todo: Todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            id={todo.id.toString()}
            name={todo.title}
            defaultChecked={todo.isCompleted}
          ></input>
          <label htmlFor={todo.id.toString()}>{todo.title}</label>
        </div>
      ))}
    </div>
  )
}

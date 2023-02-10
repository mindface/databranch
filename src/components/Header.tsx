import Link from 'next/link'

export default function Header() {
  return <header className="header">
    <nav className="nav">
      <ul className="list s-flex">
        <li className="item p-l1">
          <Link href="/">Home</Link>
        </li>
        <li className="item p-l1">
          <Link href="/schema">schema</Link>
        </li>
        <li className="item p-l1">
          <Link href="/imageCatForCheck">imageCatForCheck</Link>
        </li>
      </ul>
    </nav>
  </header>
}

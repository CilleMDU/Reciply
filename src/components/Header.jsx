export default function Header() {
  return (
    <header className="header">
      <button className="plus-btn">
        <img src="public/ikoner/plus.svg" alt="plus" />
      </button>

      <h1 className="logo">Reciply</h1>

      <div className="chef-ikon">
        <img src="src/assets/mascots/ziggy.svg" alt="logo" className="logo-ikon" />
      </div>
    </header>
  )
}
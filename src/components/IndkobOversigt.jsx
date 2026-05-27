export default function IndkobOversigt() {
    
    return (
        <>
            <header className="header">
                    <button className="plus-btn">
                        <img src="public/ikoner/plus.svg" alt="plus" />
                    </button>

                    <div className="profilNavn">
                        <h1>Indkøbslister</h1>
                    </div>

                    <div className="profilMenu">
                        <img src="public/ikoner/profilMenu.svg" alt="logo" className="profilMenu"
                        />
                    </div>
            </header>

            <main className="indkob_main">
                <div className="sogfelt">
                    <img src="public/ikoner/sogActive.svg" alt="sog" />
                </div> 

                <div className="indkobBilledeWrapper">
                    <div className="enkelListe">
                        <img className="indkobFood" src="https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="pandekag" />
                        <h2>Protein pandekage </h2>
                    </div>

                    <div className="enkelListe">
                        <img className="indkobFood" src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="vegetar wraps" />
                        <h2>Vegetar wraps </h2>
                    </div>

                    <div className="enkelListe">
                        <img className="indkobFood" src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ramen" />
                        <h2>Ramen </h2>
                    </div>

                    <div className="enkelListe">
                        <img className="indkobFood" src="https://images.unsplash.com/photo-1597524305544-cd821476715f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="pandekager" />
                        <h2>Pandekager </h2>
                    </div>

                    <div className="enkelListe">
                        <img className="indkobFood" src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1049&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="franskToast" />
                        <h2>Fransk toast </h2>
                    </div>

                    <div className="enkelListe">
                        <img className="indkobFood" src="https://images.unsplash.com/photo-1562059390-a761a084768e?q=80&w=2019&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="wraps" />
                        <h2>Wraps </h2>
                    </div>
                </div>
            </main>
        </>
    )
}
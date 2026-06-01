import { useState } from "react";

export default function IndkobSpecifik() {

    const [ingrediensListe, setIngrediensListe] = useState([
        {
            navn: "Blomkål",
            amount: "1 stk",
            checked: false
        },

        {
            navn: "Squash",
            amount: "1 stk",
            checked: false
        },

        {
            navn: "Gulerødder",
            amount: "4 stk",
            checked: false
        },

        {
            navn: "Olivenolie",
            amount: "2 spsk",
            checked: false
        },

        {
            navn: "Paprika",
            amount: "1 tsk",
            checked: false
        },

        {
            navn: "Oregano",
            amount: "1 tsk",
            checked: false
        },

        {
            navn: "Hvidløgspulver",
            amount: "1 tsk",
            checked: false
        },

        {
            navn: "Cheddar",
            amount: "150 g",
            checked: false
        },
    ]);

    function checkboxHandler(index) {

        const updatedList = [...ingrediensListe];

        updatedList[index].checked =
            !updatedList[index].checked;

        setIngrediensListe(updatedList);
    }

    return (

        <div className="indkobSIndhold">

            <header className="header">
      <button className="tilbage-btn">
        <img className="ikonerFarveChange" src="public/ikoner/tilbage.svg" alt="tilbage" />
      </button>

      <div className="logo">
        <h1>Indkøbsliste</h1>
      </div>

      <div className="skrallespan">
        <img className="ikonerFarveChange" src="public/ikoner/skrallespan.svg" alt="skrallespan" className="skrallespan" />
      </div>
    </header>

            {ingrediensListe.map((tempObjekt, index) => (

                <div
                    className="ingrediensliste"
                    key={index}
                >

                    <h2 className="navn">
                        {tempObjekt.navn}
                    </h2>

                    <h2 className="amount">
                        {tempObjekt.amount}
                    </h2>

                    <button
                        className={
                            tempObjekt.checked
                                ? "indkobKnap checked"
                                : "indkobKnap"
                        }

                        onClick={() =>
                            checkboxHandler(index)
                        }
                    >

                        {tempObjekt.checked && "✓"}

                    </button>

                </div>

            ))}
            <div className="tilOpskriftKnap">
                <button className="gaTilOpskrift">Gå til opskrift
                    <img className="ikonerFarveChange" className="fremPil" src="public/ikoner/frem.svg" alt="frem" />
                    </button>
            </div>

        </div>

    );
}
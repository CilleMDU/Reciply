import { useState } from "react";
import save from "../assets/icons/check.svg"
import edit from "../assets/icons/edit.svg"
import slet from "../assets/icons/exit.svg"
import {indkobslisteService } from "../services/indkobslisteService";

export default function IndkobsOpret() {
    const [showInputs, setShowInputs] = useState(false);

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientAmount, setIngredientAmount] = useState("");

    const [ingredients, setIngredients] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAmount, setEditAmount] = useState("");

    const [title, setTitle] = useState("");


    function addIngredient() {
        if (!ingredientName || !ingredientAmount) return;

        const newIngredient = {
            id: Date.now(),
            name: ingredientName,
            amount: ingredientAmount
        };

        setIngredients([...ingredients, newIngredient]);

        setIngredientName("");
        setIngredientAmount("");
        setShowInputs(false);
    }

    function deleteIngredient(id) {
        setIngredients(ingredients.filter(item => item.id !== id));
    }

    function startEdit(ingredient) {
        setEditId(ingredient.id);
        setEditName(ingredient.name);
        setEditAmount(ingredient.amount);
    }

    function saveEdit() {
        setIngredients(
            ingredients.map(item =>
                item.id === editId
                    ? { ...item, name: editName, amount: editAmount }
                    : item
            )
        );

        setEditId(null);
        setEditName("");
        setEditAmount("");
    }


    return (
        <>
            <header className="header">
                <button className="tilbage-btn">
                    <img src="/ikoner/tilbage.svg" alt="tilbage" />
                </button>

                <div className="logo">
                    <h1>Indkøbsliste</h1>
                </div>

                <div className="skrallespan">
                    <img src="/ikoner/skrallespan.svg" alt="skrallespan" />
                </div>
            </header>

            <main>
                <div className="indkobOpretTitleBox">
                <input
                    className="indkobOpretTitle"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}    
                />
                </div>

                <button
                    className="addIngredient"
                    onClick={() => setShowInputs(true)}
                >
                    <img src="/ikoner/plus.svg" alt="plus" /> Tilføj ingrediens
                </button>

                {showInputs && (
                    <div className="ingredientInputs">
                        <input
                            className="ingredientName"
                            type="text"
                            placeholder="Navn"
                            value={ingredientName}
                            onChange={(e) => setIngredientName(e.target.value)}
                        />

                        <input
                            className="ingredientAmount"
                            type="text"
                            placeholder="Mængde"
                            value={ingredientAmount}
                            onChange={(e) => setIngredientAmount(e.target.value)}
                        />

                        <button onClick={addIngredient}>
                            <img src={save} alt="save" />
                        </button>
                    </div>
                )}

                <div className="ingredientsList">
                    {ingredients.map((ingredient) => (
                        <div className="ingredientItem" key={ingredient.id}>

                            
                            <button
                                className="iconButton"
                                onClick={() => deleteIngredient(ingredient.id)}
                            >
                                <img src={slet} alt="slet" />
                            </button>

                            
                            {editId === ingredient.id ? (
                                <div className="ingredientText">

                                    <input
                                        className="ingNameContainer"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />

                                    <input
                                        className="ingAmountContainer"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                    />

                                    <button onClick={saveEdit}>
                                        <img src={save} alt="save" />
                                    </button>
                                </div>
                            ) : (
                                <div className="ingredientText">
                                    <div className="ingNameContainer">
                                        {ingredient.name}
                                    </div>

                                    <div className="ingAmountContainer">
                                        {ingredient.amount}
                                    </div>
                                </div>
                            )}

                           
                            {editId !== ingredient.id && (
                                <button
                                    className="iconButton"
                                    onClick={() => startEdit(ingredient)}
                                >
                                    <img src={edit} alt="edit" />
                                </button>
                            )}

                        </div>
                    ))}
                </div>

                <div className="opretbox">
                    <button className="opretIndkob"
                    onClick={() => indkobslisteService.createIndkobsliste(title , ingredients)}
                    >
                        Opret
                    </button>
                </div>
            </main>
        </>
    );
}
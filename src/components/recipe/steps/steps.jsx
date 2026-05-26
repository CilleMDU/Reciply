import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import styles from "./steps.module.css";
import remove from "../../../assets/icons/exit.svg";
import add from "../../../assets/icons/add.svg";
import edit from "../../../assets/icons/edit.svg";
import check from "../../../assets/icons/check.svg";
import { RecipeContext } from "../../../contexts/recipeContext";

const Steps = forwardRef((props, ref) => {
  const { steps: contextSteps, setSteps: setContextSteps } =
    useContext(RecipeContext);
  const [steps, setSteps] = useState(contextSteps || []);
  const [newStep, setNewStep] = useState("");
  const [showStepForm, setShowStepForm] = useState(false);
  const [confirmedSteps, setConfirmedSteps] = useState(new Set());
  const [editingStepId, setEditingStepId] = useState(null);
  const [editedStep, setEditedStep] = useState("");
  const stepTextareaRef = useRef(null);
  const editStepTextareaRef = useRef(null);

  useEffect(() => {
    setContextSteps(steps);
  }, [steps, setContextSteps]);

  useEffect(() => {
    if (stepTextareaRef.current) {
      stepTextareaRef.current.style.height = "auto";
      stepTextareaRef.current.style.height =
        stepTextareaRef.current.scrollHeight + "px";
    }
  }, [newStep]);

  useEffect(() => {
    if (editStepTextareaRef.current) {
      editStepTextareaRef.current.style.height = "auto";
      editStepTextareaRef.current.style.height =
        editStepTextareaRef.current.scrollHeight + "px";
    }
  }, [editedStep]);

  const handleAddStep = () => {
    if (newStep.trim()) {
      const stepNumber = steps.length + 1;
      const newId = Date.now();
      setSteps([...steps, { description: newStep, stepNumber, id: newId }]);
      setConfirmedSteps(new Set([...confirmedSteps, newId]));
      setNewStep("");
    }
  };

  const handleDeleteStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleConfirmStep = (id) => {
    const newConfirmed = new Set(confirmedSteps);
    if (newConfirmed.has(id)) {
      newConfirmed.delete(id);
    } else {
      newConfirmed.add(id);
    }
    setConfirmedSteps(newConfirmed);
  };

  const handleEditStep = (step) => {
    setEditingStepId(step.id);
    setEditedStep(step.description);
  };

  const handleSaveEditedStep = (id) => {
    if (editedStep.trim()) {
      setSteps(
        steps.map((step) =>
          step.id === id ? { ...step, description: editedStep } : step,
        ),
      );
      setEditingStepId(null);
      setEditedStep("");
    }
  };

  useImperativeHandle(ref, () => ({
    getSteps: () => steps,
  }));

  return (
    <div className={styles.stepsContent}>
      <p className={styles.sectionTitle}>Fremgangsmåde</p>
      <div className={styles.stepsList}>
        {steps.map((step) => (
          <div key={step.id} className={styles.stepsItem}>
            {editingStepId === step.id ? (
              <>
                <textarea
                  ref={editStepTextareaRef}
                  value={editedStep}
                  onChange={(e) => setEditedStep(e.target.value)}
                  className={styles.stepsInput}
                />
                <button
                  onClick={() => handleSaveEditedStep(step.id)}
                  className={styles.saveEditStep}
                >
                  <img src={check} alt="gem trin" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleDeleteStep(step.id)}
                  className={styles.deleteStep}
                >
                  <img src={remove} alt="fjern trin" />
                </button>
                <div className={styles.stepContainer}>
                  <span>
                    Trin {step.stepNumber}: {step.description}
                  </span>
                </div>
                {confirmedSteps.has(step.id) ? (
                  <button
                    onClick={() => handleEditStep(step)}
                    className={styles.editStep}
                  >
                    <img src={edit} alt="rediger trin" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleConfirmStep(step.id)}
                    className={`${styles.confirmStep} ${confirmedSteps.has(step.id) ? styles.confirmed : ""}`}
                  >
                    <img src={check} alt="bekræft trin" />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        {showStepForm && (
          <div className={styles.stepInputs}>
            <textarea
              ref={stepTextareaRef}
              placeholder="Beskriv første trin..."
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              className={styles.stepsInput}
            />
            <button
              onClick={() => {
                if (newStep.trim()) {
                  handleAddStep();
                  setShowStepForm(false);
                }
              }}
              className={styles.confirmAddStep}
            >
              <img src={check} alt="bekræft tilføj trin" />
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          if (showStepForm && newStep.trim()) {
            handleAddStep();
            setShowStepForm(false);
          } else {
            setShowStepForm(!showStepForm);
          }
        }}
        className={styles.addStep}
      >
        <img src={add} alt="tilføj" />
        {showStepForm ? "Tilføj trin" : "Tilføj trin"}
      </button>
    </div>
  );
});

export default Steps;

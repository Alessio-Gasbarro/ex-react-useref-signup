import { useMemo, useState, useRef } from "react"

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.?/`~";

function App() {
  //Campi Controllati
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  //Campi NON Controllati usando useRef();
  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceYearsRef = useRef();
  //const [fullName, setFullName] = useState("");
  //const [specialization, setSpecialization] = useState("");
  //const [experienceYears, setExperienceYears] = useState("");

  const isUsernameValid = useMemo(() => {
    const charsValid = [...username].every(char =>
      letters.includes(char.toLowerCase()) ||
      numbers.includes(char)
    );
    return charsValid && username.trim().length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return (
      description.trim().length >= 100 &&
      description.trim().length < 1000
    );
  }, [description]);

  const handleSubmit = e => {
    e.preventDefault();
    //Valori non controllati
    const fullName = fullNameRef.current.value;
    const specialization = specializationRef.current.value;
    const experienceYears = experienceYearsRef.current.value;

    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !experienceYears.trim() ||
      experienceYears <= 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      alert("Errore: Compilare tutti i campi correttamente.");
      return;
    }
    console.log('Submit Effettuato:', {
      fullName,
      username,
      password,
      specialization,
      experienceYears,
      description,
    });
  }

  return (
    <div className="form-test">
      <h1>Web Developer Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nome Completo</p>
          <input
            type="text"
            ref={fullNameRef}
          />
        </label>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.trim() && (
            <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
              {isUsernameValid ? "Username valido!" : "Deve avere almeno 6 caratteri alfanumerici."}
            </p>
          )}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? 'green' : 'red' }}>
              {isPasswordValid ? "Password valida!" : "Deve avere almeno 8 caratteri, 1 lettera, 1 numero, 1 simbolo."}
            </p>
          )}
        </label>
        <label>
          <p>Specializzazione</p>
          <select
            ref={specializationRef}>
            <option value="">Seleziona</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </label>
        <label>
          <p>Anni di Esperienza</p>
          <input
            type="number"
            ref={experienceYearsRef}
          />
        </label>
        <label>
          <p>Descrizione</p>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}>
          </textarea>
          {description.trim() && (
            <p style={{ color: isDescriptionValid ? 'green' : 'red' }}>
              {isDescriptionValid ? "Descrizione valida!" : `Deve avere almeno tra 100 e 1000 caratteri (${description.trim().length})`}
            </p>
          )}
        </label>
        <button type="submit">Registrati</button>
      </form>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react';

function Card({ description, title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  function onChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    console.log('iNside useEffect', form.name, form.password);

    return () => console.log('Desmontar');
  }, [form.name, form.password]);

  return (
    <div>
      <Card description='Blabla' title='Pitang 2024'>
        Pitang children
      </Card>

      <p>Seu Nome: {form.name}</p>
      <p>Seu Email: {form.email}</p>
      <p>Sua Senha: {form.password}</p>

      <form style={{ marginTop: 10 }}>
        <input
          name='name'
          value={form.name}
          onChange={onChange}
          placeholder='Insira seu nome'
        />

        <input
          name='email'
          value={form.email}
          onChange={onChange}
          placeholder='Insira seu email'
        />

        <input
          name='password'
          type='password'
          value={form.password}
          onChange={onChange}
          placeholder='Insira sua senha'
        />
      </form>
    </div>
  );
}

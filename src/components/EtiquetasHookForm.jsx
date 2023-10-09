import { useState } from 'react';
import './Etiquetas.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório!'),
  email: yup.string().email('Digite um email válido!').required('O email é obrigatório!'),
  cpf: yup.string().min(11, 'O CPF deve ter 11 dígitos!').required('O CPF é obrigatório!'),
}).required();

export default function EtiquetasHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [listaClientes, setListaClientes] = useState([]);

  const inserirCliente = (cliente) => {
    setListaClientes([...listaClientes, cliente]);
  };

  return (
    <div className="divEtiqueta">
      <form onSubmit={handleSubmit(inserirCliente)}>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <label>
            Nome:
            <input type="text" {...register('nome')} />
            <span>{errors.nome?.message}</span>
          </label>
          <label>
            Email:
            <input type="text" {...register('email')} />
            <span>{errors.email?.message}</span>
          </label>
          <label>
            CPF:
            <input type="text" {...register('cpf')} />
            <span>{errors.cpf?.message}</span>
          </label>
          <button type="submit">Criar</button>
        </fieldset>
      </form>
      <div className="painel">
        {listaClientes.map((cli, i) => (
          <div key={i} className="etiqueta">
            <p>Nome: {cli.nome}</p>
            <p>Email: {cli.email}</p>
            <p>CPF: {cli.cpf}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

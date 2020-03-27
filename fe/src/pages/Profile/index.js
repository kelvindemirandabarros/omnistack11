import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const [confirm, setConfirm] = useState(undefined);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    useEffect( () => {
        if ( incidents.length === 0 ) {
            setConfirm('Não há casos registrados pela sua ONG.');
        } else { setConfirm( undefined ); }
    }, [incidents]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, { headers: { Authorization: ongId } });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso. Envie um pedido de ajuda para o suporte.');
        }
    }

    function handleLogout() {
        localStorage.setItem('ongId', '***');
        localStorage.setItem('ongName', '***');

        history.push('/');
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt='Be The Hero' />
                <span>Bem-vindo, { ongName || '<nome da ONG>'}</span>

                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                { confirm || incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{ incident.title || '<Nome do caso>' }</p>

                        <strong>Descrições:</strong>
                        <p>{ incident.description || '<Descrições do caso>'}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'} ).format(incident.value) || '<R$ valor do caso>'}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
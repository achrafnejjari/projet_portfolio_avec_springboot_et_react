import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8089/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const data = await response.json();
            console.log('Login: Setting user, id:', data.id, 'email:', data.email);
            localStorage.setItem('user', data.email);
            localStorage.setItem('userId', data.id);
            window.dispatchEvent(new Event('storage'));
            alert('Connexion réussie');
            navigate('/portfolio-selection');
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.message);
        }
    };

    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Se connecter</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <i className="fas fa-envelope me-2"></i>Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Votre email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <i className="fas fa-lock me-2"></i>Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Votre mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="fas fa-sign-in-alt me-2"></i>Se connecter
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Pas de compte ? <Link to="/signup">S'inscrire</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
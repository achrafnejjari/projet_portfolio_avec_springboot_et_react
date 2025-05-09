import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        try {
            const response = await fetch('http://localhost:8089/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const data = await response.text();
            alert(data);
            navigate('/login');
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
                            <h2 className="text-center mb-4">S'inscrire</h2>
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
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        <i className="fas fa-lock me-2"></i>Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirmez votre mot de passe"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="fas fa-user-plus me-2"></i>S'inscrire
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Déjà un compte ? <Link to="/login">Se connecter</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
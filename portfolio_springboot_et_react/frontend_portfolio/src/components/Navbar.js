import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const user = localStorage.getItem('user');
            console.log('Navbar: user in localStorage:', user, 'isAuthenticated:', !!user);
            setIsAuthenticated(!!user);
            setUserEmail(user || '');
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
        if (!confirmLogout) {
            return;
        }
        try {
            const response = await fetch('http://localhost:8089/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setUserEmail('');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
            <div className="container">
                <Link className="navbar-brand order-lg-1 order-2" to="/">
                    <img
                        src={logo}
                        alt="Portfolio Creator"
                        style={{ height: '40px', marginRight: '10px' }}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40?text=Logo';
                            console.error('Erreur de chargement du logo');
                        }}
                    />
                    My Portfolio
                </Link>
                <button
                    className="navbar-toggler order-lg-2 order-1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse order-lg-2 order-3 justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/" style={{ transition: 'color 0.3s' }}>
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/about" style={{ transition: 'color 0.3s' }}>
                                À propos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/contact" style={{ transition: 'color 0.3s' }}>
                                Contact
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link px-3"
                                    to="/portfolio-selection"
                                    style={{ transition: 'color 0.3s' }}
                                >
                                    Portfolio
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="order-lg-3 order-4 ms-auto d-flex align-items-center">
                    {isAuthenticated ? (
                        <>
                            <span className="text-light me-3">{userEmail || 'Utilisateur'}</span>
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="btn btn-outline-light me-2">
                                S'inscrire
                            </Link>
                            <Link to="/login" className="btn btn-primary">
                                Se connecter
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <style jsx>{`
                .nav-link:hover {
                    color: #0d6efd !important;
                }
            `}</style>
        </nav>
    );
}

export default Navbar;
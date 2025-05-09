import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioPage() {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`http://localhost:8089/api/portfolio/${user}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du portfolio');
                }
                const data = await response.json();
                setPortfolio(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };
        fetchPortfolio();
    }, [navigate]);

    if (!portfolio) {
        return (
            <div className="container my-5 py-5 text-center">
                <h3>Aucun portfolio configuré</h3>
                <p>Sélectionnez un type de portfolio pour commencer.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/portfolio-selection')}
                >
                    Configurer maintenant
                </button>
            </div>
        );
    }

    return (
        <div className="container my-5 py-5">
            <div className="text-center mb-5">
                <h2 className="display-4 fw-bold animate__animated animate__fadeInDown">
                    Votre Portfolio {portfolio.portfolioType || ''}
                </h2>
            </div>
            <div className="card shadow-lg">
                <div className="card-body p-5">
                    <h3 className="fw-bold mb-3">{portfolio.name}</h3>
                    <p className="text-muted mb-4">{portfolio.description}</p>
                    {portfolio.phone && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Téléphone</h5>
                            <p>{portfolio.phone}</p>
                        </div>
                    )}
                    {portfolio.website && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Site web</h5>
                            <p>{portfolio.website}</p>
                        </div>
                    )}
                    {portfolio.skills && portfolio.portfolioType === 'Professionnel' && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Compétences</h5>
                            <p>{portfolio.skills}</p>
                        </div>
                    )}
                    {portfolio.experience && portfolio.portfolioType === 'Professionnel' && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Expérience</h5>
                            <p>{portfolio.experience} ans</p>
                        </div>
                    )}
                    {portfolio.certifications && portfolio.portfolioType === 'Professionnel' && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Certifications</h5>
                            <p>{portfolio.certifications}</p>
                        </div>
                    )}
                    {portfolio.projects && portfolio.portfolioType === 'Créatif' && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Projets</h5>
                            <p>{portfolio.projects}</p>
                        </div>
                    )}
                    {portfolio.social_media && portfolio.portfolioType === 'Créatif' && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Réseaux sociaux</h5>
                            <p>{portfolio.social_media}</p>
                        </div>
                    )}
                    {portfolio.inspiration && portfolio.portfolioType === 'Créatif' && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Inspirations</h5>
                            <p>{portfolio.inspiration}</p>
                        </div>
                    )}
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/portfolio-selection')}
                    >
                        Modifier le portfolio
                    </button>
                </div>
            </div>
            <style jsx>{`
                .card {
                    background: linear-gradient(135deg, #ffffff, #f8f9fa);
                }
                .btn-primary {
                    transition: background-color 0.3s ease;
                }
                .btn-primary:hover {
                    background-color: #0b5ed7;
                }
            `}</style>
        </div>
    );
}

export default PortfolioPage;
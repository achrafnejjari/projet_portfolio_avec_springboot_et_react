import { useLocation, useNavigate } from 'react-router-dom';

function PortfolioSummary() {
    const navigate = useNavigate();
    const location = useLocation();
    const portfolio = location.state?.portfolio || null;

    const handleViewPortfolio = () => {
        if (portfolio.type === 'Basique') {
            navigate('/portfolio/basic', { state: { portfolio } });
        } else if (portfolio.type === 'Professionnel') {
            navigate('/portfolio/professional', { state: { portfolio } });
        } else if (portfolio.type === 'Créatif') {
            navigate('/portfolio/creative', { state: { portfolio } });
        }
    };

    if (!portfolio) {
        return (
            <div className="container my-5 py-5 text-center">
                <h3>Aucun portfolio trouvé</h3>
                <p>Veuillez sauvegarder un portfolio d'abord.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/portfolio-selection')}
                >
                    Retour à la sélection
                </button>
            </div>
        );
    }

    return (
        <div className="container my-5 py-5">
            <div className="text-center mb-5">
                <h2 className="display-4 fw-bold animate__animated animate__fadeInDown">
                    Résumé de votre Portfolio {portfolio.type || ''}
                </h2>
            </div>
            <div className="card shadow-lg">
                <div className="card-body p-5">
                    <h3 className="fw-bold mb-3">{portfolio.name}</h3>
                    <p className="text-muted mb-4">{portfolio.description}</p>
                    {portfolio.age && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Âge</h5>
                            <p>{portfolio.age}</p>
                        </div>
                    )}
                    {portfolio.location && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Localisation</h5>
                            <p>{portfolio.location}</p>
                        </div>
                    )}
                    {portfolio.phone && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Téléphone</h5>
                            <p>{portfolio.phone}</p>
                        </div>
                    )}
                    {portfolio.profession && (
                        <div className="mb-4">
                            <h5 className="fw-semibold">Profession</h5>
                            <p>{portfolio.profession}</p>
                        </div>
                    )}
                    {portfolio.type === 'Basique' && (
                        <>
                            {portfolio.website && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Site web</h5>
                                    <p>{portfolio.website}</p>
                                </div>
                            )}
                        </>
                    )}
                    {portfolio.type === 'Professionnel' && (
                        <>
                            {portfolio.experience_years && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Expérience</h5>
                                    <p>{portfolio.experience_years} ans</p>
                                </div>
                            )}
                            {portfolio.education && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Formation</h5>
                                    <p>{portfolio.education}</p>
                                </div>
                            )}
                            {portfolio.skills && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Compétences</h5>
                                    <p>{portfolio.skills}</p>
                                </div>
                            )}
                            {portfolio.languages && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Langues</h5>
                                    <p>{portfolio.languages}</p>
                                </div>
                            )}
                            {portfolio.linkedin_url && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">LinkedIn</h5>
                                    <p>{portfolio.linkedin_url}</p>
                                </div>
                            )}
                            {portfolio.github_url && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">GitHub</h5>
                                    <p>{portfolio.github_url}</p>
                                </div>
                            )}
                        </>
                    )}
                    {portfolio.type === 'Créatif' && (
                        <>
                            {portfolio.creative_field && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Domaine créatif</h5>
                                    <p>{portfolio.creative_field}</p>
                                </div>
                            )}
                            {portfolio.projects && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Projets</h5>
                                    <p>{portfolio.projects}</p>
                                </div>
                            )}
                            {portfolio.tools && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Outils</h5>
                                    <p>{portfolio.tools}</p>
                                </div>
                            )}
                            {portfolio.social_media && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">Réseaux sociaux</h5>
                                    <p>{portfolio.social_media}</p>
                                </div>
                            )}
                            {portfolio.linkedin_url && (
                                <div className="mb-4">
                                    <h5 className="fw-semibold">LinkedIn</h5>
                                    <p>{portfolio.linkedin_url}</p>
                                </div>
                            )}
                        </>
                    )}
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/portfolio-selection', { state: { type: portfolio.type, portfolio } })}
                        >
                            Modifier
                        </button>
                        <button className="btn btn-secondary" onClick={handleViewPortfolio}>
                            Voir Portfolio
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .card {
                    background: linear-gradient(135deg, #ffffff, #f8f9fa);
                }
                .btn-primary, .btn-secondary {
                    transition: background-color 0.3s ease;
                }
                .btn-primary:hover {
                    background-color: #0b5ed7;
                }
                .btn-secondary:hover {
                    background-color: #5c636a;
                }
            `}</style>
        </div>
    );
}

export default PortfolioSummary;
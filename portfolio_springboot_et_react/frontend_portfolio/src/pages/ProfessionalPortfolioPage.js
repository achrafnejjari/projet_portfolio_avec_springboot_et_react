import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';

function ProfessionalPortfolioPage() {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const email = localStorage.getItem('user'); // Removed setEmail since it's unused
    const [imageError, setImageError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Stored email:', email);
        if (!email) {
            setImageError('Email manquant dans localStorage');
            setLoading(false);
            return;
        }

        console.log('Fetching portfolio for email:', email);
        fetch(`http://localhost:8089/api/portfolio/${email}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched portfolio:', data);
                if (data) {
                    setPortfolio(data);
                    setImageError(null);
                } else {
                    setImageError('Aucun portfolio trouvé pour cet email');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du portfolio:', error);
                setImageError(`Erreur: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [email]);

    useEffect(() => {
        if (portfolio && portfolio.photoPath && email) {
            console.log('Fetching image from:', `http://localhost:8089/api/portfolio/image/${email}`);
            fetch(`http://localhost:8089/api/portfolio/image/${email}`)
                .then(response => {
                    console.log('Image fetch response status:', response.status);
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
                    }
                    setImageError(null);
                    console.log('Image fetch successful');
                })
                .catch(error => {
                    console.error('Erreur lors du chargement de l\'image:', error);
                    setImageError(error.message);
                });
        } else if (portfolio) {
            console.log('Conditions non remplies pour charger l\'image:', {
                hasPhotoPath: !!portfolio.photoPath,
                hasEmail: !!email
            });
            setImageError('PhotoPath ou email manquant');
        }
    }, [portfolio, email]);

    if (loading) {
        return (
            <div className="portfolio-container text-center py-5">
                <h3 className="animate__animated animate__fadeIn">Chargement du portfolio...</h3>
            </div>
        );
    }

    if (!email || !portfolio) {
        return (
            <div className="portfolio-container text-center py-5">
                <h3 className="animate__animated animate__fadeIn">Aucun portfolio trouvé</h3>
                <p>Veuillez vous connecter ou créer un portfolio.</p>
                <button
                    className="btn btn-primary animate__animated animate__pulse"
                    onClick={() => navigate('/portfolio-selection')}
                >
                    Retour à la sélection
                </button>
            </div>
        );
    }

    return (
        <div className="portfolio-container">
            {/* Hero Section */}
            <section className="hero-section text-center py-5 animate__animated animate__fadeIn">
                <div className="container">
                    {portfolio.photoPath && !imageError ? (
                        <img
                            src={`http://localhost:8089/api/portfolio/image/${email}`}
                            alt="Profil"
                            className="profile-img mb-4"
                            onError={() => setImageError('Erreur de chargement de l\'image')}
                        />
                    ) : (
                        <div className="no-image mb-4">
                            Pas d'image
                            {imageError && <p className="text-danger mt-2">Erreur : {imageError}</p>}
                        </div>
                    )}
                    <h1 className="display-4 fw-bold mb-3">{portfolio.name}</h1>
                    <p className="lead text-light mb-4">{portfolio.profession || 'Professionnel'}</p>
                    <p className="description mx-auto">{portfolio.description}</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section py-5">
                <div className="container">
                    <h2 className="section-title text-center mb-5 animate__animated animate__fadeInUp">À propos</h2>
                    <div className="row g-4">
                        {portfolio.location && (
                            <div className="col-md-4">
                                <div className="info-card animate__animated animate__fadeInLeft">
                                    <h5>Localisation</h5>
                                    <p>{portfolio.location}</p>
                                </div>
                            </div>
                        )}
                        {portfolio.experienceYears && (
                            <div className="col-md-4">
                                <div className="info-card animate__animated animate__fadeInUp">
                                    <h5>Expérience</h5>
                                    <p>{portfolio.experienceYears} ans</p>
                                </div>
                            </div>
                        )}
                        {portfolio.languages && (
                            <div className="col-md-4">
                                <div className="info-card animate__animated animate__fadeInRight">
                                    <h5>Langues</h5>
                                    <p>{portfolio.languages}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            {portfolio.skills && (
                <section className="skills-section py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title text-center mb-5 animate__animated animate__fadeInUp">Compétences</h2>
                        <div className="row g-3 justify-content-center">
                            {portfolio.skills.split(',').map((skill, index) => (
                                <div key={index} className="col-auto">
                                    <span className="skill-badge animate__animated animate__zoomIn">
                                        {skill.trim()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {/* Commented out as in original code */}

            {/* Contact Section */}
            <section className="contact-section py-5 bg-light">
                <div className="container text-center">
                    <h2 className="section-title mb-5 animate__animated animate__fadeInUp">Contact</h2>
                    <div className="row g-4 justify-content-center">
                        {portfolio.phone && (
                            <div className="col-md-4">
                                <div className="contact-card animate__animated animate__fadeInLeft">
                                    <FaPhone size={30} className="mb-2" />
                                    <h5>Téléphone</h5>
                                    <p>{portfolio.phone}</p>
                                </div>
                            </div>
                        )}
                        {portfolio.linkedinUrl && (
                            <div className="col-md-4">
                                <div className="contact-card animate__animated animate__fadeInUp">
                                    <FaLinkedin size={30} className="mb-2" />
                                    <h5>LinkedIn</h5>
                                    <a href={portfolio.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                        Voir le profil
                                    </a>
                                </div>
                            </div>
                        )}
                        {portfolio.githubUrl && (
                            <div className="col-md-4">
                                <div className="contact-card animate__animated animate__fadeInRight">
                                    <FaGithub size={30} className="mb-2" />
                                    <h5>GitHub</h5>
                                    <a href={portfolio.githubUrl} target="_blank" rel="noopener noreferrer">
                                        Voir les projets
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        className="btn btn-primary mt-5 animate__animated animate__pulse animate__infinite"
                        onClick={() => navigate('/portfolio-selection', { state: { type: 'Professionnel', portfolio } })}
                    >
                        Modifier le Portfolio
                    </button>
                </div>
            </section>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                .portfolio-container {
                    background: #f5f7fa;
                    font-family: 'Inter', sans-serif;
                    min-height: 100vh;
                }
                .hero-section {
                    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                    color: #fff;
                    padding: 80px 0;
                }
                .profile-img {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 4px solid #fff;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease;
                }
                .profile-img:hover {
                    transform: scale(1.1);
                }
                .no-image {
                    width: 150px;
                    height: 150px;
                    background: #d1d5db;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: #4b5563;
                    font-size: 1rem;
                    border: 4px solid #fff;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
                .description {
                    max-width: 600px;
                    font-size: 1.1rem;
                    color: #e5e7eb;
                }
                .section-title {
                    color: #1e3a8a;
                    font-weight: 700;
                }
                .info-card {
                    background: #fff;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .info-card:hover {
                    transform: translateY(-5px);
                }
                .info-card h5 {
                    color: #1e3a8a;
                    margin-bottom: 10px;
                }
                .skill-badge {
                    background: #3b82f6;
                    color: #fff;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    transition: background 0.3s ease;
                }
                .skill-badge:hover {
                    background: #1e3a8a;
                }
                .project-card {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                }
                .project-card:hover {
                    transform: translateY(-5px);
                }
                .project-img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .project-card h5 {
                    color: #1e3a8a;
                    margin: 15px 20px 10px;
                }
                .project-card p {
                    margin: 0 20px 20px;
                    color: #4b5563;
                }
                .contact-card {
                    background: #fff;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .contact-card:hover {
                    transform: translateY(-5px);
                }
                .contact-card h5 {
                    color: #1e3a8a;
                    margin-bottom: 10px;
                }
                .contact-card a {
                    color: #3b82f6;
                    text-decoration: none;
                }
                .contact-card a:hover {
                    text-decoration: underline;
                }
                .btn-primary {
                    background: #3b82f6;
                    border: none;
                    border-radius: 50px;
                    padding: 12px 30px;
                    font-weight: 600;
                    color: #fff;
                    transition: background 0.3s ease, transform 0.3s ease;
                }
                .btn-primary:hover {
                    background: #1e3a8a;
                    transform: scale(1.05);
                }
                .bg-light {
                    background: #e5e7eb;
                }
                @media (max-width: 768px) {
                    .profile-img, .no-image {
                        width: 120px;
                        height: 120px;
                    }
                    .hero-section {
                        padding: 60px 0;
                    }
                    .description {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default ProfessionalPortfolioPage;
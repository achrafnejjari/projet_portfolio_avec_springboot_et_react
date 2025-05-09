import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

function CreativePortfolioPage() {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem('user'));
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
                if (data && data.type === 'Créatif') {
                    setPortfolio(data);
                    setImageError(null);
                } else {
                    setImageError('Aucun portfolio créatif trouvé pour cet email');
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
                    const img = new Image();
                    img.src = `http://localhost:8089/api/portfolio/image/${email}`;
                    img.onload = () => {
                        console.log('Image dimensions:', {
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        });
                        const imgElement = document.querySelector('.profile-img');
                        if (imgElement) {
                            const styles = window.getComputedStyle(imgElement);
                            console.log('Image computed styles:', {
                                background: styles.background,
                                overflow: styles.overflow,
                                zIndex: styles.zIndex
                            });
                        }
                    };
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
            <div className="creative-portfolio text-center py-5">
                <h3 className="animate__animated animate__fadeIn">Chargement du portfolio...</h3>
            </div>
        );
    }

    if (!email || !portfolio) {
        return (
            <div className="creative-portfolio text-center py-5">
                <h3 className="animate__animated animate__fadeIn">Aucun portfolio trouvé</h3>
                <p>Veuillez vous connecter ou créer un portfolio créatif.</p>
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
        <div className="creative-portfolio">
            {/* Hero Section */}
            <div className="hero-section text-center py-5 animate__animated animate__fadeIn">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-3">{portfolio.name}</h1>

                    <p className="description mx-auto">{portfolio.description}</p>
                    <div className="hero-buttons mt-4">
                        <button className="btn btn-outline-light" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                            Contactez-moi
                        </button>
                    </div>
                    {portfolio.photoPath && !imageError ? (
                        <img
                            src={`http://localhost:8089/api/portfolio/image/${email}`}
                            alt="Profil"
                            className="profile-img mt-4"
                            onError={() => setImageError('Erreur de chargement de l\'image')}
                        />
                    ) : (
                        <div className="no-image mt-4">
                            Pas d'image
                            {imageError && <p className="text-danger mt-2">Erreur : {imageError}</p>}
                        </div>
                    )}
                </div>
            </div>

            {/* About Section */}
            {(portfolio.inspiration || portfolio.tools || portfolio.creativeField) && (
                <div className="about-section py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title text-center mb-5 animate__animated animate__fadeInUp">À propos</h2>
                        <div className="row g-4 justify-content-center">
                            {portfolio.inspiration && (
                                <div className="col-md-4">
                                    <div className="info-card animate__animated animate__fadeInLeft">
                                        <h5>Inspiration</h5>
                                        <p>{portfolio.inspiration}</p>
                                    </div>
                                </div>
                            )}
                            {portfolio.tools && (
                                <div className="col-md-4">
                                    <div className="info-card animate__animated animate__fadeInUp">
                                        <h5>Outils</h5>
                                        <p>{portfolio.tools}</p>
                                    </div>
                                </div>
                            )}
                            {portfolio.creativeField && (
                                <div className="col-md-4">
                                    <div className="info-card animate__animated animate__fadeInRight">
                                        <h5>Domaine Créatif</h5>
                                        <p>{portfolio.creativeField}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Projects Section */}
            <div className="projects-section py-5">
                <div className="container">
                    <h2 className="section-title text-center mb-5 animate__animated animate__fadeInUp">Projets</h2>
                    <div className="row g-3 justify-content-center">
                        {(portfolio.projects || 'Projet 1, Projet 2, Projet 3').split(',').map((project, index) => (
                            <div key={index} className="col-auto">
                                <span className="project-badge animate__animated animate__zoomIn">
                                    {project.trim()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            {(portfolio.instagramUrl || portfolio.twitterUrl) && (
                <div className="contact-section py-5">
                    <div className="container text-center">
                        <h2 className="section-title mb-5 animate__animated animate__fadeInUp">Contact</h2>
                        <div className="row g-4 justify-content-center">
                            {portfolio.instagramUrl && (
                                <div className="col-md-4">
                                    <div className="contact-card animate__animated animate__fadeInLeft">
                                        <FaInstagram size={24} className="mb-2" />
                                        <h5>Instagram</h5>
                                        <a href={portfolio.instagramUrl} target="_blank" rel="noopener noreferrer">
                                            Voir le profil
                                        </a>
                                    </div>
                                </div>
                            )}
                            {portfolio.twitterUrl && (
                                <div className="col-md-4">
                                    <div className="contact-card animate__animated animate__fadeInRight">
                                        <FaTwitter size={24} className="mb-2" />
                                        <h5>Twitter</h5>
                                        <a href={portfolio.twitterUrl} target="_blank" rel="noopener noreferrer">
                                            Suivre
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modifier Button */}
            <div className="modifier-button">
                <button
                    className="btn btn-primary animate__animated animate__pulse animate__infinite"
                    onClick={() => navigate('/portfolio-selection', { state: { type: 'Créatif', portfolio } })}
                >
                    Modifier le Portfolio
                </button>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                .creative-portfolio {
                    background: #fff;
                    font-family: 'Poppins', sans-serif;
                    min-height: 100vh;
                    position: relative;
                }
                .hero-section {
                    background: linear-gradient(135deg, #ec4899, #8b5cf6);
                    color: #fff;
                    padding: 80px 0;
                    position: relative;
                    overflow: visible;
                    z-index: 1;
                }
                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url('https://www.transparenttextures.com/patterns/cubes.png');
                    opacity: 0.1;
                    z-index: -1;
                }
                .container {
                    overflow: visible;
                    position: relative;
                    z-index: 2;
                }
                .profile-img {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 4px solid #fff;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                    margin: 0 auto;
                    display: block;
                    z-index: 3;
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
                    margin: 0 auto;
                    z-index: 3;
                }
                .description {
                    max-width: 600px;
                    font-size: 1.1rem;
                    color: #e5e7eb;
                    margin: 0 auto;
                }
                .hero-buttons .btn-outline-light {
                    border-color: #fff;
                    color: #fff;
                    border-radius: 50px;
                    padding: 12px 30px;
                    font-weight: 600;
                    transition: background 0.3s ease, transform 0.3s ease;
                }
                .hero-buttons .btn-outline-light:hover {
                    background: #fff;
                    color: #ec4899;
                    transform: scale(1.05);
                }
                .section-title {
                    color: #8b5cf6;
                    font-weight: 700;
                    font-size: 2rem;
                }
                .info-card {
                    background: #fff;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    transition: transform 0.3s ease;
                    border: 2px solid #ec4899;
                    min-height: 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .info-card:hover {
                    transform: translateY(-5px);
                }
                .info-card h5 {
                    color: #8b5cf6;
                    margin-bottom: 10px;
                }
                .info-card p {
                    margin: 0;
                    color: #4b5563;
                    flex-grow: 1;
                }
                .project-badge {
                    background: #ec4899;
                    color: #fff;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    transition: background 0.3s ease;
                }
                .project-badge:hover {
                    background: #8b5cf6;
                }
                .contact-card {
                    background: #fff;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    transition: transform 0.3s ease;
                    border: 2px solid #ec4899;
                    min-height: 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .contact-card:hover {
                    transform: translateY(-5px);
                }
                .contact-card h5 {
                    color: #8b5cf6;
                    margin-bottom: 10px;
                }
                .contact-card a {
                    color: #ec4899;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .contact-card a:hover {
                    color: #8b5cf6;
                }
                .btn-primary {
                    background: #ec4899;
                    border: none;
                    border-radius: 50px;
                    padding: 12px 30px;
                    font-weight: 600;
                    color: #fff;
                    transition: background 0.3s ease, transform 0.3s ease;
                }
                .btn-primary:hover {
                    background: #8b5cf6;
                    transform: scale(1.05);
                }
                .bg-light {
                    background: #f3e8ff;
                }
                .modifier-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                .modifier-button .btn-primary {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
                    .section-title {
                        font-size: 1.8rem;
                    }
                    .info-card, .contact-card {
                        min-height: 200px;
                    }
                    .modifier-button {
                        bottom: 15px;
                        right: 15px;
                    }
                }
            `}</style>
        </div>
    );
}

export default CreativePortfolioPage;
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PortfolioSelection() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialType = location.state?.type || '';
    const [portfolioType, setPortfolioType] = useState('');
    const [selectedType, setSelectedType] = useState(initialType);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        photo: null,
        age: '',
        location: '',
        phone: '',
        profession: '',
        website: '',
        experience_years: '',
        education: '',
        skills: '',
        languages: '',
        linkedin_url: '',
        github_url: '',
        creative_field: '',
        projects: '',
        tools: '',
        social_media: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        console.log('PortfolioSelection: user in localStorage:', user);
        if (!user) {
            console.log('PortfolioSelection: Redirecting to /login because user is not authenticated');
            navigate('/login');
            return;
        }

        if (location.state?.portfolio) {
            const portfolio = location.state.portfolio;
            setFormData({
                name: portfolio.name || '',
                description: portfolio.description || '',
                photo: null,
                age: portfolio.age || '',
                location: portfolio.location || '',
                phone: portfolio.phone || '',
                profession: portfolio.profession || '',
                website: portfolio.website || '',
                experience_years: portfolio.experience_years || '',
                education: portfolio.education || '',
                skills: portfolio.skills || '',
                languages: portfolio.languages || '',
                linkedin_url: portfolio.linkedin_url || '',
                github_url: portfolio.github_url || '',
                creative_field: portfolio.creative_field || '',
                projects: portfolio.projects || '',
                tools: portfolio.tools || '',
                social_media: portfolio.social_media || ''
            });
            setPortfolioType(portfolio.type);
            setSelectedType(portfolio.type);
        }
    }, [navigate, location.state]);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setPortfolioType(type);
        setFormData({
            name: formData.name,
            description: formData.description,
            photo: null,
            age: formData.age,
            location: formData.location,
            phone: formData.phone,
            profession: formData.profession,
            website: type === 'Basique' ? formData.website : '',
            experience_years: type === 'Professionnel' ? formData.experience_years : '',
            education: type === 'Professionnel' ? formData.education : '',
            skills: type === 'Professionnel' ? formData.skills : '',
            languages: type === 'Professionnel' ? formData.languages : '',
            linkedin_url: type !== 'Basique' ? formData.linkedin_url : '',
            github_url: type === 'Professionnel' ? formData.github_url : '',
            creative_field: type === 'Créatif' ? formData.creative_field : '',
            projects: type === 'Créatif' ? formData.projects : '',
            tools: type === 'Créatif' ? formData.tools : '',
            social_media: type === 'Créatif' ? formData.social_media : ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const form = new FormData();
        form.append('email', user);
        form.append('portfolioType', selectedType);
        form.append('name', formData.name);
        form.append('description', formData.description);
        if (formData.photo) {
            form.append('photo', formData.photo);
        }
        form.append('age', formData.age);
        form.append('location', formData.location);
        form.append('phone', formData.phone);
        form.append('profession', formData.profession);
        if (selectedType === 'Basique') {
            form.append('website', formData.website);
        }
        if (selectedType === 'Professionnel') {
            form.append('experience_years', formData.experience_years);
            form.append('education', formData.education);
            form.append('skills', formData.skills);
            form.append('languages', formData.languages);
            form.append('linkedin_url', formData.linkedin_url);
            form.append('github_url', formData.github_url);
        }
        if (selectedType === 'Créatif') {
            form.append('creative_field', formData.creative_field);
            form.append('projects', formData.projects);
            form.append('tools', formData.tools);
            form.append('social_media', formData.social_media);
            form.append('linkedin_url', formData.linkedin_url);
        }

        try {
            const response = await fetch('http://localhost:8089/api/portfolio', {
                method: 'POST',
                body: form
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.log('Réponse du serveur:', errorText);
                throw new Error(errorText);
            }
            const portfolioData = {
                type: selectedType,
                name: formData.name,
                description: formData.description,
                age: formData.age,
                location: formData.location,
                phone: formData.phone,
                profession: formData.profession,
                website: selectedType === 'Basique' ? formData.website : '',
                experience_years: selectedType === 'Professionnel' ? formData.experience_years : '',
                education: selectedType === 'Professionnel' ? formData.education : '',
                skills: selectedType === 'Professionnel' ? formData.skills : '',
                languages: selectedType === 'Professionnel' ? formData.languages : '',
                linkedin_url: selectedType !== 'Basique' ? formData.linkedin_url : '',
                github_url: selectedType === 'Professionnel' ? formData.github_url : '',
                creative_field: selectedType === 'Créatif' ? formData.creative_field : '',
                projects: selectedType === 'Créatif' ? formData.projects : '',
                tools: selectedType === 'Créatif' ? formData.tools : '',
                social_media: selectedType === 'Créatif' ? formData.social_media : ''
            };
            setPortfolioType(selectedType);
            navigate('/portfolio-summary', { state: { portfolio: portfolioData } });
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.message);
        }
    };

    const renderForm = () => {
        if (!selectedType) return null;
        return (
            <div className="mt-5 animate__animated animate__fadeIn">
                <h3 className="text-center mb-4">Personnaliser votre portfolio {selectedType}</h3>
                <form onSubmit={handleSubmit} className="card shadow-lg p-4">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photo" className="form-label">Photo de profil</label>
                        <input
                            type="file"
                            className="form-control"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Âge</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Localisation</label>
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Ex: Paris, France"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Ex: +33 123 456 789"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profession" className="form-label">Profession</label>
                        <input
                            type="text"
                            className="form-control"
                            id="profession"
                            name="profession"
                            value={formData.profession}
                            onChange={handleInputChange}
                            placeholder="Ex: Étudiant, Développeur"
                        />
                    </div>
                    {selectedType === 'Basique' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="website" className="form-label">Site web</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="Ex: https://mon-site.com"
                                />
                            </div>
                        </>
                    )}
                    {selectedType === 'Professionnel' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="experience_years" className="form-label">Années d'expérience</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="experience_years"
                                    name="experience_years"
                                    value={formData.experience_years}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="education" className="form-label">Formation</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="education"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Master en Informatique, 2023"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="skills" className="form-label">Compétences</label>
                                <textarea
                                    className="form-control"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Ex: Java, Python, SQL"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="languages" className="form-label">Langues</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="languages"
                                    name="languages"
                                    value={formData.languages}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Français, Anglais"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="linkedin_url" className="form-label">LinkedIn</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="linkedin_url"
                                    name="linkedin_url"
                                    value={formData.linkedin_url}
                                    onChange={handleInputChange}
                                    placeholder="Ex: https://linkedin.com/in/..."
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="github_url" className="form-label">GitHub</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="github_url"
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleInputChange}
                                    placeholder="Ex: https://github.com/..."
                                />
                            </div>
                        </>
                    )}
                    {selectedType === 'Créatif' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="creative_field" className="form-label">Domaine créatif</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="creative_field"
                                    name="creative_field"
                                    value={formData.creative_field}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Design, Photographie"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="projects" className="form-label">Projets</label>
                                <textarea
                                    className="form-control"
                                    id="projects"
                                    name="projects"
                                    value={formData.projects}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Ex: Illustration, Design UI"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tools" className="form-label">Outils utilisés</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tools"
                                    name="tools"
                                    value={formData.tools}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Photoshop, Canva"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="social_media" className="form-label">Réseaux sociaux</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="social_media"
                                    name="social_media"
                                    value={formData.social_media}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Instagram, Behance"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="linkedin_url" className="form-label">LinkedIn</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="linkedin_url"
                                    name="linkedin_url"
                                    value={formData.linkedin_url}
                                    onChange={handleInputChange}
                                    placeholder="Ex: https://linkedin.com/in/..."
                                />
                            </div>
                        </>
                    )}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={() => setSelectedType('')}>
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="container my-5 py-5">
            {!selectedType && (
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold animate__animated animate__fadeInDown">
                        Choisissez Votre Portfolio
                    </h2>
                    <p className="lead text-muted mt-3">
                        Sélectionnez un style qui reflète votre identité professionnelle.
                        {portfolioType && (
                            <span className="d-block mt-2 fw-semibold text-primary">
                                Type actuel : {portfolioType}
                            </span>
                        )}
                    </p>
                </div>
            )}
            {!selectedType && (
                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-lg portfolio-card">
                            <div className="card-body text-center p-4">
                                <i className="fas fa-briefcase fa-3x mb-3 text-primary"></i>
                                <h5 className="card-title fw-bold">Portfolio Basique</h5>
                                <p className="card-text text-muted">
                                    Idéal pour les débutants avec un design simple et épuré.
                                </p>
                                <button
                                    className="btn btn-outline-primary btn-lg mt-3"
                                    onClick={() => handleTypeSelect('Basique')}
                                >
                                    Choisir
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-lg portfolio-card">
                            <div className="card-body text-center p-4">
                                <i className="fas fa-suitcase fa-3x mb-3 text-primary"></i>
                                <h5 className="card-title fw-bold">Portfolio Professionnel</h5>
                                <p className="card-text text-muted">
                                    Parfait pour les freelances et experts en quête d'élégance.
                                </p>
                                <button
                                    className="btn btn-outline-primary btn-lg mt-3"
                                    onClick={() => handleTypeSelect('Professionnel')}
                                >
                                    Choisir
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-lg portfolio-card">
                            <div className="card-body text-center p-4">
                                <i className="fas fa-palette fa-3x mb-3 text-primary"></i>
                                <h5 className="card-title fw-bold">Portfolio Créatif</h5>
                                <p className="card-text text-muted">
                                    Pour les artistes et créateurs avec un style audacieux.
                                </p>
                                <button
                                    className="btn btn-outline-primary btn-lg mt-3"
                                    onClick={() => handleTypeSelect('Créatif')}
                                >
                                    Choisir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {renderForm()}
            <style jsx>{`
                .portfolio-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    background: linear-gradient(135deg, #ffffff, #f8f9fa);
                }
                .portfolio-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
                }
                .btn-outline-primary {
                    border-width: 2px;
                    font-weight: 500;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                .btn-outline-primary:hover {
                    background-color: #0d6efd;
                    color: #fff;
                }
                .form-control:focus {
                    border-color: #0d6efd;
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                }
                @media (max-width: 768px) {
                    .portfolio-card {
                        margin-bottom: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default PortfolioSelection;
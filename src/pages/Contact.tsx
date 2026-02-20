import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="contact-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div className="page-hero-content text-center mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="section-label"><MessageSquare size={12} /> Get in Touch</div>
                        <h1>Let's Start the <span className="text-gradient">Conversation</span></h1>
                        <p className="mx-auto">Have questions about implementation? Want a custom quote? Our team is ready to help you modernize your credential system.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Contact Information</h2>
                            <p className="contact-desc">Fill out the form and our team will get back to you within 24 hours.</p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <div className="icon-box"><Phone size={20} /></div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+91 1800 123 4567</p>
                                        <p className="text-sm text-muted">Mon-Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="icon-box"><Mail size={20} /></div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>support@digilocker2.com</p>
                                        <p>sales@digilocker2.com</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="icon-box"><MapPin size={20} /></div>
                                    <div>
                                        <h4>Headquarters</h4>
                                        <p>Block C, Technology Park,</p>
                                        <p>New Delhi, India - 110020</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.0688975472578!3d28.52735229047976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1709283456789!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="contact-form-container card"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {submitted ? (
                                <div className="success-message">
                                    <div className="success-icon"><Send size={32} /></div>
                                    <h3>Message Sent!</h3>
                                    <p>Thank you for reaching out. We'll be in touch shortly.</p>
                                    <button onClick={() => setSubmitted(false)} className="btn btn-secondary mt-4">Send Another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-input"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="form-input"
                                            placeholder="john@university.edu"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject</label>
                                        <select
                                            className="form-input"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="sales">Sales Inquiry</option>
                                            <option value="support">Technical Support</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            required
                                            className="form-input"
                                            placeholder="How can we help you?"
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full">
                                        Send Message <Send size={16} />
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

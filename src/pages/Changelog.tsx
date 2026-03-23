import React from 'react';
import FooterCopyright from '../components/FooterCopyright';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Changelog: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-grow p-4 lg:p-8 max-w-4xl mx-auto w-full space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="space-y-2">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary/80" asChild>
                            <a href="/" className="flex items-center gap-2 text-muted-foreground transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back to Generator
                            </a>
                        </Button>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Changelog
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Stay updated with the latest improvements and features.
                        </p>
                    </div>
                    <a
                        href="/rss.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors font-medium text-sm border border-orange-200/50 dark:border-orange-500/20"
                    >
                        <span className="material-symbols-outlined text-sm">rss_feed</span>
                        Subscribe to feed
                    </a>
                </div>

                {/* Changelog Entries */}
                <div className="space-y-8">

                    {/* Version 2.1.0 */}
                    <div className="relative pl-8 md:pl-0">
                        <div className="hidden md:flex absolute -left-3 top-0 items-center justify-center w-6 h-6 rounded-full bg-blue-100 ring-4 ring-background">
                            <span className="material-symbols-outlined text-xs text-blue-600">new_releases</span>
                        </div>

                        <Card className="shadow-xl border-primary/10 bg-card hover:border-primary/20 transition-all duration-500 border-l-4 border-l-blue-500">
                            <CardHeader className="pb-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                                            v2.5.0
                                            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200">
                                                UI & Documentation Polish
                                            </Badge>
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            March 23, 2026
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground leading-relaxed font-normal">
                                    Continuing our commitment to visual excellence and transparency, this update introduces a more refined header layout, clearer feature visibility through badges, and expanded legal documentation. We've also polished the theme customization experience for a more premium feel.
                                </p>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2 text-foreground">
                                            <span className="material-symbols-outlined text-sm text-blue-500">design_services</span>
                                            UI & UX Refinement
                                        </h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                                Horizontal header layout with a more natural information flow.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                                New feature badges highlighting our key principles: Open-Source, Free, Private & Secure.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                                Improved theme customizer with interactive sliding labels and compact design.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2 text-foreground">
                                            <span className="material-symbols-outlined text-sm text-green-500">verified</span>
                                            Trust & Transparency
                                        </h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                                                Added comprehensive legal pages including UGC Disclaimer and DMCA Policy.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                                                Updated web manifest and site metadata for a unified brand identity.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                                                Integrated standard tracking and background noise effects for a professional touch.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-3 md:col-span-2 pt-4 border-t border-gray-100">
                                        <h3 className="font-semibold flex items-center gap-2 text-[var(--accent-color)]">
                                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                                            Open-Source & Deployment
                                        </h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-[#6366f1] mt-1.5" />
                                                <span>Official <strong>Open Source</strong> launch! The codebase is now public for transparency and community contribution at <a href="https://github.com/ajbatac/qrky" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">github.com/ajbatac/qrky</a>.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                                                Full <strong>PWA (Progressive Web App)</strong> support with service worker integration for installability and offline caching of core assets.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                                                Optimized for <strong>Netlify Deployment</strong> with advanced routing rules and SEO meta data improvements.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Version 2.0.0 */}
                    <div className="relative pl-8 md:pl-0">
                        <div className="hidden md:flex absolute -left-3 top-0 items-center justify-center w-6 h-6 rounded-full bg-purple-100 ring-4 ring-background">
                            <span className="material-symbols-outlined text-xs text-purple-600">star</span>
                        </div>

                        <Card className="shadow-xl border-primary/10 bg-card hover:border-primary/20 transition-all duration-500 border-l-4 border-l-purple-500">
                            <CardHeader className="pb-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                                            v2.0.0
                                            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200">
                                                Major Update
                                            </Badge>
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            January 15, 2026
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground leading-relaxed">
                                    We've kicked off 2026 with a massive update! The entire interface has been modernized with a fresh new look, improved responsiveness on all devices, and smoother interactions. We've also unified our versioning system and improved the underlying architecture for faster performance.
                                </p>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2 text-foreground">
                                            <span className="material-symbols-outlined text-sm text-purple-500">auto_awesome</span>
                                            Visual Overhaul
                                        </h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                                Complete redesign with premium aesthetics and glassmorphism elements.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                                Softer shadows, refined borders, and modern gradients.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                                Smooth animations for a more fluid user experience.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2 text-foreground">
                                            <span className="material-symbols-outlined text-sm text-amber-500">bolt</span>
                                            Improvements
                                        </h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                                                Enhanced mobile responsiveness - looks great on any screen size.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                                                Fixed spacing inconsistencies on narrower monitors.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                                                Updated navigation and footer for better accessibility.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Version 1.1.0 */}
                    <div className="relative pl-8 md:pl-0 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="hidden md:flex absolute -left-3 top-0 items-center justify-center w-6 h-6 rounded-full bg-gray-100 ring-4 ring-background">
                            <span className="material-symbols-outlined text-xs text-gray-500">article</span>
                        </div>
                        <Card className="bg-card/40 border-muted/50 backdrop-blur-sm hover:bg-card/60 transition-all duration-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-xl font-bold text-foreground">v1.1.0</CardTitle>
                                    <span className="text-sm text-muted-foreground">August 15, 2025</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                                        UI improvements and visual polish.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                                        Added clear usage instructions.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                                        Performance optimizations and code cleanup.
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Version 1.0.0 */}
                    <div className="relative pl-8 md:pl-0 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="hidden md:flex absolute -left-3 top-0 items-center justify-center w-6 h-6 rounded-full bg-gray-100 ring-4 ring-background">
                            <span className="material-symbols-outlined text-xs text-gray-500">shield</span>
                        </div>
                        <Card className="bg-card/40 border-muted/50 backdrop-blur-sm hover:bg-card/60 transition-all duration-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-xl font-bold text-foreground">v1.0.0</CardTitle>
                                    <span className="text-sm text-muted-foreground">August 15, 2025</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Initial release of QRky - the professional QR code generator.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">Real-time Preview</Badge>
                                    <Badge variant="outline">Custom Styles</Badge>
                                    <Badge variant="outline">WCAG Analysis</Badge>
                                    <Badge variant="outline">Image Decoder</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
            <FooterCopyright />
        </div>
    );
};

export default Changelog;

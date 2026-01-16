import React from 'react';
import FooterCopyright from '../components/FooterCopyright';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Rss, ArrowLeft, Star, Zap, Shield, Wand2 } from 'lucide-react';
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
                                <ArrowLeft className="w-4 h-4" />
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-medium text-sm"
                    >
                        <Rss className="w-4 h-4" />
                        Subscribe to feed
                    </a>
                </div>

                {/* Changelog Entries */}
                <div className="space-y-8">

                    {/* Version 2.0.0 */}
                    <div className="relative pl-8 md:pl-0">
                        <div className="hidden md:flex absolute -left-3 top-0 items-center justify-center w-6 h-6 rounded-full bg-purple-100 ring-4 ring-background">
                            <Star className="w-3 h-3 text-purple-600" />
                        </div>

                        <Card className="elevated-card border-l-4 border-l-purple-500">
                            <CardHeader className="pb-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                            v2.0.0
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
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
                                <p className="text-gray-600 leading-relaxed">
                                    We've kicked off 2026 with a massive update! The entire interface has been modernized with a fresh new look, improved responsiveness on all devices, and smoother interactions. We've also unified our versioning system and improved the underlying architecture for faster performance.
                                </p>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                                            <Wand2 className="w-4 h-4 text-purple-500" />
                                            Visual Overhaul
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-600">
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
                                        <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                                            <Zap className="w-4 h-4 text-amber-500" />
                                            Improvements
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-600">
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
                            <ScrollText className="w-3 h-3 text-gray-500" />
                        </div>
                        <Card className="card-subtle">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-xl font-bold">v1.1.0</CardTitle>
                                    <span className="text-sm text-muted-foreground">August 15, 2025</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600">
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
                            <Shield className="w-3 h-3 text-gray-500" />
                        </div>
                        <Card className="card-subtle">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-xl font-bold">v1.0.0</CardTitle>
                                    <span className="text-sm text-muted-foreground">August 15, 2025</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-3">
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

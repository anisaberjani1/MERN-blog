import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDiscord} from 'react-icons/bs'

export default function FooterCom(){
    return (
        <Footer container className="border border-t-4 border-teal-400">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-col-1">
                    <div className="mt-5">
                        <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-teal-400 rounded-lg text-white">Code</span>
                            Chronicles
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About"/>
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href="https://face-recognition-itsg.onrender.com" 
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Face Recognition Project
                                </Footer.Link>
                                <Footer.Link 
                                    href="/about" 
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Code Chronicles
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div> 
                        <div>
                            <Footer.Title title="Follow Us"/>
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href="https://github.com/anisaberjani1" 
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    GitHub
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div> 
                        <div>
                            <Footer.Title title="Legal"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>                     
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright 
                        href="#" 
                        by="Code Chronicles" 
                        year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook}/>
                        <Footer.Icon href="#" icon={BsInstagram}/>
                        <Footer.Icon href="#" icon={BsTwitter}/>
                        <Footer.Icon href="https://github.com/anisaberjani1" icon={BsGithub}/>
                        <Footer.Icon href="#" icon={BsDiscord}/>
                    </div>
                </div>
            </div>
        </Footer>
    )
}
import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">Want to learn more about Javascript?</h2>
            <p className="text-gray-500 my-2">Checkout this Project</p>
            <Button gradientDuoTone='cyanToBlue' className="rounded-tl-xl rounded-bl-none">
                <a href="https://face-recognition-itsg.onrender.com" 
                    target="_blank"
                    rel="noopener noreferrer">
                    Face Recognition
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://images.prismic.io/turing/652ec1ecfbd9a45bcec8192b_Using_Deep_Learning_to_Design_Real_time_Face_Detection_and_Recognition_Systems_938a8cdcd7.webp?auto=format%2Ccompress&fit=max&w=3840" alt="" />
        </div>
    </div>
  )
}

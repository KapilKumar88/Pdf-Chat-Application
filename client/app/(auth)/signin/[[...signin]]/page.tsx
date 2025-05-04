import { SignIn } from "@clerk/nextjs";

export default function Signin() {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <SignIn />
    </div>
}
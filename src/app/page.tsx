import Catalog from "@/app/components/catalog";


export const revalidate = 60; // Regenerate the page every 60 seconds

export default function Home() {


    return (
        <div className="bg-white">
            <Catalog/>
        </div>
    );
}
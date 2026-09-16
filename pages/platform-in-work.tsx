import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Wrench, ArrowLeft } from "lucide-react";

import { RootState } from "@/store";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PLATFORM_NAME } from "@/assets/language/constants";

const PlatformInWork: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const router = useRouter();

    return (
        <>
            <Head>
                <title>
                    {PLATFORM_NAME} | {languageData?.WebsiteInWork || "Under construction"}
                </title>
            </Head>
            <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "radial-gradient(700px 400px at 20% 0%, hsl(var(--primary) / 0.1), transparent 60%), radial-gradient(600px 400px at 100% 100%, hsl(var(--terracotta) / 0.08), transparent 60%)",
                    }}
                />
                <Container size="md" className="py-16 text-center">
                    <div className="mx-auto w-full max-w-sm">
                        <Image
                            src="/images/platform_in_work.png"
                            alt={languageData?.WebsiteInWorkTitle || "Platform under construction"}
                            width={451}
                            height={400}
                            className="h-auto w-full"
                            priority
                        />
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        <Wrench className="h-3.5 w-3.5 text-terracotta" />
                        {languageData?.WebsiteInWork || "Under construction"}
                    </div>
                    <h1 className="mt-5 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        {languageData?.WebsiteInWorkTitle || "We'll be back soon"}
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                        {languageData?.WebsiteInWorkMessage ||
                            "This part of the platform is getting an upgrade. Thanks for your patience."}
                    </p>
                    <div className="mt-7">
                        <Button size="lg" variant="outline" onClick={() => router.push("/home")}>
                            <ArrowLeft />
                            {languageData?.GoHome || "Go home"}
                        </Button>
                    </div>
                </Container>
            </section>
        </>
    );
};

export const getServerSideProps = async () => ({ props: {} });

export default PlatformInWork;

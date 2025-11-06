import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/componentes/ui/dialog";
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Label } from "@/componentes/ui/label";
import { Link } from "react-router-dom";

export function ModalInscricao({ children }) {
    return (
        <Dialog>
            {/* qualquer elemento passado vira o gatilho */}
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[505px]">
                <DialogHeader>
                    <DialogTitle>Faça a sua inscrição</DialogTitle>
                    <DialogDescription>
                        Selecione se sua inscrição é individual ou de um time.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-10 justify-center">
                    <Link to='/individual' className="bg-[#300B74] duration-300 hover:bg-[#220854] hover:scale-105">INDIVIDUAL</Button>
                    <Link to='/time' className="bg-[#300B74] duration-300 hover:bg-[#220854] hover:scale-105">TIME</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

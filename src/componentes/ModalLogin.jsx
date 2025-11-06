// Modal.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/componentes/ui/dialog";
import { Button } from "@/componentes/ui/button";
import { Input } from "@/componentes/ui/input";
import { Label } from "@/componentes/ui/label";

export default function ModalLogin({ open, onOpenChange, email, senha, onEmail, onSenha, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Entrar</DialogTitle>
          <DialogDescription>Acesse o seu login para continuar.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => onEmail(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={senha} onChange={(e) => onSenha(e.target.value)} required />
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#300B74] duration-300 hover:bg-[#220854] hover:scale-105">Entrar</Button>
          </DialogFooter>
        </form>
        <div className="relative my-2">
          <div className="h-px w-full bg-muted" />
        </div>

        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <a
            href="/cadastro"
            className="text-[#300B74] font-medium underline underline-offset-4 hover:opacity-80"
          >
            Cadastre-se
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const inputClass =
  "w-full box-border px-3.5 py-[13px] bg-[rgba(241,240,236,0.05)] border border-[rgba(241,240,236,0.25)] text-[#F1F0EC] text-[15px] font-sans placeholder:text-[rgba(241,240,236,0.4)] focus:outline-none focus:border-accent";

const labelClass =
  "flex flex-col gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[#8C8A82]";

// Total raw size cap for attached drawings; base64 inflates ~33% and the
// edge function request body has to stay well under Supabase's payload limit.
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    namn: "",
    email: "",
    foretag: "",
    meddelande: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSent(false);
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const total = [...files, ...incoming].reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_ATTACHMENT_BYTES) {
      toast({
        title: t("contact.toast.fileTooLargeTitle"),
        description: t("contact.toast.fileTooLargeDesc"),
        variant: "destructive",
      });
      return;
    }
    setFiles((prev) => [...prev, ...incoming]);
    setSent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // File names stay in the message body as a fallback in case an email
    // client strips the attachments.
    const meddelande =
      formData.meddelande +
      (files.length ? `\n\nRitningsfiler: ${files.map((f) => f.name).join(", ")}` : "");

    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          contentType: f.type || "application/octet-stream",
          contentBase64: await fileToBase64(f),
        })),
      );

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          namn: formData.namn,
          email: formData.email,
          telefon: "",
          foretag: formData.foretag,
          meddelande,
          attachments,
        },
      });

      if (error) {
        console.error("Error sending email:", error);
        toast({
          title: t("contact.toast.errorTitle"),
          description: t("contact.toast.errorDesc"),
          variant: "destructive",
        });
        return;
      }

      toast({ title: t("contact.toast.title"), description: t("contact.toast.desc") });
      setSent(true);
      setFormData({ namn: "", email: "", foretag: "", meddelande: "" });
      setFiles([]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: t("contact.toast.errorTitle"),
        description: t("contact.toast.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = isSubmitting
    ? t("contact.form.submitting")
    : sent
      ? t("contact.form.done")
      : t("contact.form.submit");

  return (
    <section id="kontakt" className="bg-primary text-primary-foreground py-16 md:py-[110px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{t("contact.kicker")}</span>
          <h2 className="mt-[18px] text-4xl md:text-[52px] font-semibold tracking-[-0.02em] leading-[1.06] [text-wrap:balance]">
            {t("contact.h2")}
          </h2>
          <div className="mt-10 md:mt-[52px] flex flex-col gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8A82] mb-[5px]">
                {t("contact.email")}
              </div>
              <a
                href="mailto:info@alloynordic.se"
                className="text-lg font-semibold text-primary-foreground hover:text-accent transition-colors duration-150"
              >
                info@alloynordic.se
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8A82] mb-[5px]">
                {t("contact.phone")}
              </div>
              <a
                href="tel:+46706675099"
                className="text-lg font-semibold text-primary-foreground hover:text-accent transition-colors duration-150"
              >
                +46 70 66 750 99
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8A82] mb-[5px]">
                {t("contact.address")}
              </div>
              <span className="text-lg font-semibold">Ågatan 47, 334 32 Anderstorp</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] lg:pt-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={labelClass}>
              {t("contact.form.name")} *
              <input
                name="namn"
                value={formData.namn}
                onChange={handleChange}
                required
                placeholder={t("contact.form.namePlaceholder")}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              {t("contact.form.email")} *
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("contact.form.emailPlaceholder")}
                className={inputClass}
              />
            </label>
          </div>
          <label className={labelClass}>
            {t("contact.form.company")}
            <input
              name="foretag"
              value={formData.foretag}
              onChange={handleChange}
              placeholder={t("contact.form.companyPlaceholder")}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            {t("contact.form.message")} *
            <textarea
              name="meddelande"
              value={formData.meddelande}
              onChange={handleChange}
              required
              rows={4}
              placeholder={t("contact.form.messagePlaceholder")}
              className={`${inputClass} resize-y`}
            />
          </label>

          {/* Drawing dropzone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`border border-dashed p-[18px] text-center text-[13px] cursor-pointer transition-colors duration-150 ${
              dragOver ? "border-accent text-primary-foreground" : "border-[rgba(241,240,236,0.3)] text-[#8C8A82]"
            }`}
          >
            {files.length === 0 ? (
              t("contact.form.dropzone")
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {files.map((f, i) => (
                  <span
                    key={`${f.name}-${i}`}
                    className="inline-flex items-center gap-2 border border-[rgba(241,240,236,0.25)] px-2.5 py-1 text-primary-foreground font-mono text-[11px]"
                  >
                    {f.name}
                    <button
                      type="button"
                      aria-label={`Ta bort ${f.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles((prev) => prev.filter((_, j) => j !== i));
                      }}
                      className="text-[#8C8A82] hover:text-accent"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.step,.stp,.iges,.igs,.dxf,.dwg,.zip"
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent-deep text-accent-foreground text-[15px] font-semibold px-5 py-4 hover:bg-[#9C2E08] transition-colors duration-150 disabled:opacity-70"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

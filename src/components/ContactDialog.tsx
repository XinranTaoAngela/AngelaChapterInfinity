import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/resume'

export function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [copyStatus, setCopyStatus] = useState('')
  useEffect(() => {
    const element = dialog.current
    if (open && !element?.open) element?.showModal()
    if (!open && element?.open) element.close()
  }, [open])
  async function copyEmail() {
    try { await navigator.clipboard.writeText(CONTACT.email); setCopyStatus('Email copied.') }
    catch { setCopyStatus('Select the address above to copy it manually.') }
  }
  return <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-title" onClose={() => { setCopyStatus(''); onClose() }} onClick={event => {
    if (event.target === event.currentTarget) {
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close()
    }
  }}>
    <button className="dialog-close" aria-label="Close contact information" onClick={() => dialog.current?.close()}>×</button>
    <p className="eyebrow">THE HUMAN EDITION</p><h2 id="contact-title">Hey, let’s talk.</h2>
    <p>Reach me at:</p>
    <p className="email-address">{CONTACT.email}</p>
    <div className="contact-actions"><button type="button" onClick={() => void copyEmail()}>Copy email</button></div>
    <p className="copy-status" role="status">{copyStatus}</p>
  </dialog>
}

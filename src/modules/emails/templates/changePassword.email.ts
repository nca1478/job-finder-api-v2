export function changePasswordEmail(urlRedirect: string) {
  return `
    <h1>Instrucciones para cambiar la contraseña</h1>
    <p>
        Recibimos una solicitud para cambiar la contraseña. Este enlace es válido durante las próximas 24 horas: &nbsp;
        <a href="${urlRedirect}">Recuperar contraseña</a>
    </p>
	`;
}

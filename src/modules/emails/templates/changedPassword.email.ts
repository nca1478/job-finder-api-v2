export function changedPasswordEmail(urlClient: string) {
  return `
		<h1>Contraseña cambiada exitosamente</h1>
    <p>
        Ahora puedes iniciar sesión en la aplicación. <a href="${urlClient}">Ir al inicio</a>
    </p>
	`;
}

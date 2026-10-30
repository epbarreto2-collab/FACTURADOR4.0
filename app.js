/* --- ESTRUCTURA DE DATOS DE PRODUCTOS --- */
const PRODUCTOS = [
  {
    id: 1,
    nombre: "RTX 5090 Cyber-Titan 32GB",
    categoria: "Componentes",
    precio: 1999.00,
    desc: "Arquitectura Quantum-Trace con refrigeración líquida por plasma.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#00f2fe" stroke-width="2"><rect x="8" y="16" width="48" height="32" rx="4"/><circle cx="24" cy="32" r="8"/><circle cx="40" cy="32" r="8"/><path d="M12 48v6M52 48v6"/></svg>`
  },
  {
    id: 2,
    nombre: "Procesador Quantum Core i11-X",
    categoria: "Componentes",
    precio: 899.00,
    desc: "64 Núcleos de procesamiento fotónico a 7.2 GHz.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#f0b429" stroke-width="2"><rect x="16" y="16" width="32" height="32" rx="3"/><path d="M24 8v8M32 8v8M40 8v8M24 48v8M32 48v8M40 48v8M8 24h8M8 32h8M8 40h8M48 24h8M48 32h8M48 40h8"/></svg>`
  },
  {
    id: 3,
    nombre: "Monitor Cyber OLED 360Hz 4K",
    categoria: "Periféricos",
    precio: 1299.00,
    desc: "Pantalla curvada interactiva con cobertura de color 150% DCI-P3.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#00f2fe" stroke-width="2"><rect x="6" y="12" width="52" height="32" rx="4"/><path d="M24 44l-4 12M40 44l4 12M16 56h32"/></svg>`
  },
  {
    id: 4,
    nombre: "Teclado Mecánico CyberPunk RGB",
    categoria: "Periféricos",
    precio: 189.00,
    desc: "Switches ópticos hálicos con feedback háptico programable.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff007f" stroke-width="2"><rect x="6" y="20" width="52" height="24" rx="4"/><path d="M12 26h4M20 26h4M28 26h4M36 26h4M44 26h4M12 32h4M20 32h4M28 32h16M48 32h4"/></svg>`
  },
  {
    id: 5,
    nombre: "SSD NVMe Gen5 4TB Quantum",
    categoria: "Componentes",
    precio: 349.00,
    desc: "Velocidad de lectura sostenida hasta 14,500 MB/s con disipador RGB.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#00f2fe" stroke-width="2"><rect x="12" y="20" width="40" height="24" rx="3"/><circle cx="20" cy="32" r="3"/><circle cx="44" cy="32" r="2"/><line x1="28" y1="26" x2="36" y2="26"/><line x1="28" y1="38" x2="36" y2="38"/></svg>`
  },
  {
    id: 6,
    nombre: "Visor HoloLens Cyber-Goggles",
    categoria: "Gadgets",
    precio: 749.00,
    desc: "Inmersión de realidad mixta holográfica con baja latencia.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#f0b429" stroke-width="2"><path d="M8 24c0-4 4-8 12-8h24c8 0 12 4 12 8v12c0 6-4 12-12 12H20c-8 0-12-6-12-12V24z"/><circle cx="24" cy="30" r="6"/><circle cx="40" cy="30" r="6"/></svg>`
  },
  {
    id: 7,
    nombre: "Auriculares Neón Hápticos 7.1",
    categoria: "Periféricos",
    precio: 229.00,
    desc: "Cancelación de ruido neuro-activa y drivers de grafeno.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#00f2fe" stroke-width="2"><path d="M12 32c0-12 8-20 20-20s20 8 20 20"/><rect x="8" y="28" width="10" height="18" rx="4"/><rect x="46" y="28" width="10" height="18" rx="4"/></svg>`
  },
  {
    id: 8,
    nombre: "Guante Háptico CyberGlove Pro",
    categoria: "Gadgets",
    precio: 450.00,
    desc: "Siente texturas digitales en entornos de simulación espacial.",
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff007f" stroke-width="2"><path d="M20 48V28a4 4 0 018 0v-4a4 4 0 018 0v-2a4 4 0 018 0v10a4 4 0 018 0v16c0 8-6 14-16 14S20 56 20 48z"/></svg>`
  }
];

/* --- ESTADO DEL CARRITO --- */
let carrito = [];
let descuentoPorcentaje = 0;
let categoriaSeleccionada = 'todos';

/* --- INICIALIZACIÓN --- */
window.addEventListener('DOMContentLoaded', () => {
  renderizarCatalogo();
  actualizarCarritoUI();

  // Tracking de movimiento de mouse para Luz Focal
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
  });
});

/* --- RENDERIZADO DEL CATÁLOGO --- */
function renderizarCatalogo() {
  const grid = document.getElementById('catalogoGrid');
  grid.innerHTML = '';

  const busqueda = document.getElementById('searchInput').value.toLowerCase();

  const productosFiltrados = PRODUCTOS.filter(p => {
    const coincideCategoria =
      (categoriaSeleccionada === 'todos') ||
      (p.categoria === categoriaSeleccionada);

    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda) ||
      p.desc.toLowerCase().includes(busqueda);

    return coincideCategoria && coincideBusqueda;
  });

  if (productosFiltrados.length === 0) {
    grid.innerHTML = `<div class="vacio" style="grid-column: 1 / -1;">No se encontraron productos que coincidan.</div>`;
    return;
  }

  productosFiltrados.forEach(prod => {
    const enCarrito = carrito.some(item => item.id === prod.id);

    const card = document.createElement('div');
    card.className = `producto ${enCarrito ? 'en-carrito' : ''}`;
    card.id = `prod-card-${prod.id}`;

    card.innerHTML = `
      <div class="producto-img-box">
        ${prod.svgIcon}
      </div>
      <span class="categoria">${prod.categoria}</span>
      <div class="nombre">${prod.nombre}</div>
      <div class="desc">${prod.desc}</div>
      <div class="precio-row">
        <span class="precio">$${prod.precio.toFixed(2)}</span>
        <button class="btn-add" onclick="agregarAlCarrito(${prod.id}, event)">
          ${enCarrito ? '✓ En Carrito' : '+ Agregar'}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* --- FILTROS --- */
function filtrarProductos() {
  renderizarCatalogo();
}

function filtrarCategoria(cat, btnEl) {
  categoriaSeleccionada = cat;

  // Actualizar estilos botones
  document.querySelectorAll('#category-pills .categoria-btn')
    .forEach(b => b.classList.remove('activo'));

  btnEl.classList.add('activo');

  renderizarCatalogo();
}

/* --- LÓGICA DE AGREGAR AL CARRITO CON ANIMACIÓN --- */
function agregarAlCarrito(prodId, event) {
  const producto = PRODUCTOS.find(p => p.id === prodId);
  if (!producto) return;

  const itemExistente = carrito.find(i => i.id === prodId);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  // Generar efecto de vuelo desde el botón hacia el carrito
  if (event && event.currentTarget) {
    crearParticulaVoladora(event.currentTarget);
  } else {
    actualizarCarritoUI();
  }

  renderizarCatalogo();
  reproducirSonidoSynth(600, 0.08);
}

/* ANIMACIÓN DE ELEMENTO VOLANDO AL CARRITO */
function crearParticulaVoladora(sourceEl) {
  const cartBtn = document.getElementById('cart-toggle-btn');
  const sourceRect = sourceEl.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  const flyer = document.createElement('div');
  flyer.className = 'flyer-particle';
  flyer.innerHTML = '⚡';

  // Posición Inicial
  flyer.style.left = `${sourceRect.left + sourceRect.width / 2 - 14}px`;
  flyer.style.top = `${sourceRect.top + sourceRect.height / 2 - 14}px`;

  document.body.appendChild(flyer);

  // Animación Web API
  const animation = flyer.animate([
    {
      left: `${sourceRect.left + sourceRect.width / 2 - 14}px`,
      top: `${sourceRect.top + sourceRect.height / 2 - 14}px`,
      transform: 'scale(1.4) rotate(0deg)',
      opacity: 1
    },
    {
      left: `${cartRect.left + cartRect.width / 2 - 14}px`,
      top: `${cartRect.top + cartRect.height / 2 - 14}px`,
      transform: 'scale(0.3) rotate(360deg)',
      opacity: 0.8
    }
  ], {
    duration: 650,
    easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)'
  });

  animation.onfinish = () => {
    flyer.remove();

    // Sacudida y pulso en el ícono del carrito
    const badge = document.getElementById('cart-badge');

    cartBtn.classList.add('sacudir');
    badge.classList.add('pulso');

    setTimeout(() => {
      cartBtn.classList.remove('sacudir');
      badge.classList.remove('pulso');
    }, 400);

    actualizarCarritoUI();
  };
}

/* --- CAMBIAR CANTIDAD --- */
function cambiarCantidad(prodId, delta) {
  const item = carrito.find(i => i.id === prodId);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    eliminarDelCarrito(prodId);
    return;
  }

  actualizarCarritoUI();
  renderizarCatalogo();
}

/* --- ELIMINAR DEL CARRITO --- */
function eliminarDelCarrito(prodId) {
  carrito = carrito.filter(i => i.id !== prodId);

  actualizarCarritoUI();
  renderizarCatalogo();
}

/* --- VACIAR CARRITO --- */
function vaciarCarrito() {
  carrito = [];

  actualizarCarritoUI();
  renderizarCatalogo();
}

/* --- ACTUALIZAR RENDER DEL CARRITO --- */
function actualizarCarritoUI() {
  const contenedor = document.getElementById('contenedorListaCarrito');
  const badge = document.getElementById('cart-badge');
  const btnVaciar = document.getElementById('btnVaciar');
  const btnComprar = document.getElementById('btnComprar');

  const totalItems = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  badge.textContent = totalItems;

  if (carrito.length === 0) {
    contenedor.innerHTML =
      `<div class="vacio">El carrito está vacío. ¡Añade algunos ítems tech!</div>`;

    btnVaciar.disabled = true;
    btnComprar.disabled = true;
  } else {
    btnVaciar.disabled = false;
    btnComprar.disabled = false;

    let html = '<ul class="lista-carrito">';

    carrito.forEach(item => {
      html += `
        <li class="item">
          <div class="detalle">
            <small>${item.categoria}</small>
            <div class="titulo-item">${item.nombre}</div>
            <div class="precio-item">
              $${(item.precio * item.cantidad).toFixed(2)}
              ($${item.precio.toFixed(2)} c/u)
            </div>
          </div>

          <div class="cantidad">
            <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
            <span style="font-weight:bold; width:20px; text-align:center;">
              ${item.cantidad}
            </span>
            <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
          </div>

          <button class="quitar" title="Eliminar"
            onclick="eliminarDelCarrito(${item.id})">&times;</button>
        </li>
      `;
    });

    html += '</ul>';
    contenedor.innerHTML = html;
  }

  actualizarResumenCarrito();
}

/* --- CÁLCULO DE FINANZAS: FACTURADOR 4.0 --- */
const IVA = 0.15;

function totalUnidadesCarrito() {
  return carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  );
}

function porcentajeDescuentoCantidad(unidades) {
  if (unidades >= 10) return 0.10;
  if (unidades >= 5) return 0.05;
  return 0;
}

function actualizarResumenCarrito() {
  const subtotal = carrito.reduce(
    (acc, item) => acc + (item.precio * item.cantidad),
    0
  );

  const unidades = totalUnidadesCarrito();

  // Descuento automático por volumen:
  // 5% desde 5 unidades y 10% desde 10.
  const porcentajeCantidad = porcentajeDescuentoCantidad(unidades);
  const montoDescuentoCantidad = subtotal * porcentajeCantidad;

  // Cupón promocional del proyecto CyberTech Store.
  const montoDescuentoCupon =
    subtotal * (descuentoPorcentaje / 100);

  // Los descuentos no pueden superar el subtotal.
  const descuentoTotal = Math.min(
    subtotal,
    montoDescuentoCantidad + montoDescuentoCupon
  );

  const envioSeleccionado = parseFloat(
    document.getElementById('metodoEnvio').value || 5
  );

  const envio = subtotal > 0 ? envioSeleccionado : 0;

  // IVA aplicado después de los descuentos e incluyendo el envío.
  const baseImponible = Math.max(
    0,
    subtotal - descuentoTotal + envio
  );

  const iva = baseImponible * IVA;
  const total = baseImponible + iva;

  document.getElementById('subtotalVal').textContent =
    `$${subtotal.toFixed(2)}`;

  document.getElementById('envioVal').textContent =
    `$${envio.toFixed(2)}`;

  document.getElementById('ivaVal').textContent =
    `$${iva.toFixed(2)}`;

  document.getElementById('totalVal').textContent =
    `$${total.toFixed(2)}`;

  // Mostrar descuento por cantidad.
  const lineaCantidad = document.getElementById(
    'lineaDescuentoCantidad'
  );

  if (montoDescuentoCantidad > 0) {
    lineaCantidad.style.display = 'flex';

    document.getElementById('descuentoCantidadVal').textContent =
      `-$${montoDescuentoCantidad.toFixed(2)} (${Math.round(porcentajeCantidad * 100)}%)`;
  } else {
    lineaCantidad.style.display = 'none';
  }

  // Mostrar descuento por cupón.
  const lineaCupon = document.getElementById('lineaDescuento');

  if (montoDescuentoCupon > 0) {
    lineaCupon.style.display = 'flex';

    document.getElementById('descuentoVal').textContent =
      `-$${montoDescuentoCupon.toFixed(2)} (${descuentoPorcentaje}%)`;
  } else {
    lineaCupon.style.display = 'none';
  }
}

/* --- CUPONES DE DESCUENTO --- */
function aplicarCupon() {
  const input = document.getElementById('cuponInput');
  const msg = document.getElementById('cuponMsg');
  const codigo = input.value.trim().toUpperCase();

  if (codigo === 'CYBER2026') {
    descuentoPorcentaje = 15;
    msg.style.color = '#4ade80';
    msg.textContent = '✓ ¡Cupón CYBER2026 aplicado! (15% OFF)';

  } else if (codigo === 'NEON10') {
    descuentoPorcentaje = 10;
    msg.style.color = '#4ade80';
    msg.textContent = '✓ ¡Cupón NEON10 aplicado! (10% OFF)';

  } else if (codigo === '') {
    descuentoPorcentaje = 0;
    msg.textContent = '';

  } else {
    descuentoPorcentaje = 0;
    msg.style.color = '#fca5a5';
    msg.textContent = '✕ Código de cupón inválido.';
  }

  actualizarResumenCarrito();
}

/* --- TOGGLE DE CARRITO SLIDE-OVER --- */
function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');

  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

/* --- SOBRECARGA Y SONIDO DE LOGO --- */
function efectoSobrecargaLogo() {
  const logoSvg = document.getElementById('logoSvg');

  logoSvg.classList.add('sobrecarga');
  reproducirSonidoSynth(880, 0.15);

  setTimeout(() => {
    logoSvg.classList.remove('sobrecarga');
  }, 600);
}

/* --- CHECKOUT Y CELEBRACIÓN --- */
function procesarCompra() {
  if (carrito.length === 0) return;

  const totalVal = document.getElementById('totalVal').textContent;
  const orderId =
    '#CYBER-' + Math.floor(1000 + Math.random() * 9000);

  document.getElementById('modalOrderId').textContent = orderId;
  document.getElementById('modalTotalPaid').textContent = totalVal;

  // Reproducir acorde cyber de victoria.
  reproducirSonidoCheckout();

  // Cerrar Drawer y abrir Modal de Celebración.
  toggleCartDrawer();
  document.getElementById('checkoutModal').classList.add('open');

  // Limpiar datos.
  carrito = [];
  descuentoPorcentaje = 0;

  document.getElementById('metodoEnvio').selectedIndex = 0;
  document.getElementById('cuponInput').value = '';
  document.getElementById('cuponMsg').textContent = '';

  actualizarCarritoUI();
  renderizarCatalogo();
}

function cerrarModalCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
}

// Cerrar el carrito o la ventana de compra con Escape.
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.getElementById('checkoutModal').classList.remove('open');
  }
});

/* --- SINTETIZADOR DE AUDIO WEB API --- */
function reproducirSonidoSynth(freq, dur) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + dur
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + dur);

  } catch (e) {
    // Ignorar si el audio no está habilitado por políticas del navegador.
  }
}

function reproducirSonidoCheckout() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notas = [523.25, 659.25, 783.99, 1046.50];

    notas.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(
        freq,
        ctx.currentTime + (idx * 0.08)
      );

      gain.gain.setValueAtTime(
        0.08,
        ctx.currentTime + (idx * 0.08)
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + (idx * 0.08) + 0.3
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + (idx * 0.08));
      osc.stop(ctx.currentTime + (idx * 0.08) + 0.3);
    });

  } catch (e) {
    // Ignorar errores de audio.
  }
}
export function clearContactValidation(form) {
  form.elements.namedItem('email')?.setCustomValidity('');
  form.elements.namedItem('phone')?.setCustomValidity('');
}

export function validateNameAndContact(form, nameField = 'name') {
  const nameInput = form.elements.namedItem(nameField);
  const emailInput = form.elements.namedItem('email');
  const phoneInput = form.elements.namedItem('phone');
  const hasEmail = emailInput?.value.trim();
  const hasPhone = phoneInput?.value.trim();

  emailInput?.setCustomValidity('');
  phoneInput?.setCustomValidity('');

  if (!hasEmail && !hasPhone) {
    const message = 'Enter an email address or phone number.';
    emailInput?.setCustomValidity(message);
    phoneInput?.setCustomValidity(message);
  }

  return form.reportValidity() && Boolean(nameInput?.value.trim()) && Boolean(hasEmail || hasPhone);
}

export async function submitFormSubmit(endpoint, formData) {
  const isLocalhost =
    typeof window !== 'undefined' &&
    ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);

  if (isLocalhost) {
    await submitFormViaHiddenFrame(endpoint, formData);
    return { ok: true };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to send request.');
  }

  return payload;
}

function submitFormViaHiddenFrame(endpoint, formData) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Unable to submit form.'));
      return;
    }

    const frameName = `formsubmit-${Date.now()}`;
    const iframe = document.createElement('iframe');
    iframe.name = frameName;
    iframe.title = 'Form submission target';
    iframe.style.display = 'none';

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = endpoint;
    form.target = frameName;
    form.style.display = 'none';

    formData.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = typeof value === 'string' ? value : String(value);
      form.appendChild(input);
    });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();

    window.setTimeout(() => {
      iframe.remove();
      form.remove();
      resolve({ ok: true });
    }, 1500);
  });
}


import { useEffect } from 'react';

const SecurityHeaders = () => {
  useEffect(() => {
    // Content Security Policy
    const cspMeta = document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspMeta.setAttribute('content', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://www.google.com https://www.gstatic.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https: blob:; " +
      "connect-src 'self' https://api.supabase.co https://*.supabase.co; " +
      "frame-src 'self' https://www.google.com;"
    );
    document.head.appendChild(cspMeta);

    // X-Content-Type-Options
    const noSniffMeta = document.createElement('meta');
    noSniffMeta.setAttribute('http-equiv', 'X-Content-Type-Options');
    noSniffMeta.setAttribute('content', 'nosniff');
    document.head.appendChild(noSniffMeta);

    // X-Frame-Options
    const frameOptionsMeta = document.createElement('meta');
    frameOptionsMeta.setAttribute('http-equiv', 'X-Frame-Options');
    frameOptionsMeta.setAttribute('content', 'DENY');
    document.head.appendChild(frameOptionsMeta);

    // X-XSS-Protection
    const xssProtectionMeta = document.createElement('meta');
    xssProtectionMeta.setAttribute('http-equiv', 'X-XSS-Protection');
    xssProtectionMeta.setAttribute('content', '1; mode=block');
    document.head.appendChild(xssProtectionMeta);

    // Referrer Policy
    const referrerMeta = document.createElement('meta');
    referrerMeta.setAttribute('name', 'referrer');
    referrerMeta.setAttribute('content', 'strict-origin-when-cross-origin');
    document.head.appendChild(referrerMeta);

    // Permissions Policy
    const permissionsMeta = document.createElement('meta');
    permissionsMeta.setAttribute('http-equiv', 'Permissions-Policy');
    permissionsMeta.setAttribute('content', 
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    );
    document.head.appendChild(permissionsMeta);

    // Force HTTPS redirect
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }

    // Cleanup function
    return () => {
      [cspMeta, noSniffMeta, frameOptionsMeta, xssProtectionMeta, referrerMeta, permissionsMeta].forEach(meta => {
        if (document.head.contains(meta)) {
          document.head.removeChild(meta);
        }
      });
    };
  }, []);

  return null;
};

export default SecurityHeaders;

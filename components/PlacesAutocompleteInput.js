'use client';

import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsApiKey, loadPlacesLibrary } from '../lib/googlePlaces';

const TAMIL_NADU_BIAS = {
  south: 8.0,
  west: 76.2,
  north: 13.6,
  east: 80.4,
};

function readWidgetText(element) {
  if (!element) return '';
  if (typeof element.value === 'string') return element.value;
  const input = element.shadowRoot?.querySelector('input');
  return input?.value ?? '';
}

/**
 * Place search field using google.maps.places.PlaceAutocompleteElement (Places API new).
 * Falls back to a plain text input when no API key is configured.
 */
export default function PlacesAutocompleteInput({
  name,
  placeholder,
  required = false,
  disabled = false,
  mode = 'address',
  className = '',
}) {
  const hostRef = useRef(null);
  const widgetRef = useRef(null);
  const hiddenRef = useRef(null);
  const [useFallback, setUseFallback] = useState(() => !getGoogleMapsApiKey());
  const [text, setText] = useState('');

  useEffect(() => {
    if (useFallback || !hostRef.current) return undefined;

    let cancelled = false;

    const init = async () => {
      try {
        const { PlaceAutocompleteElement } = await loadPlacesLibrary();
        if (cancelled || !hostRef.current) return;

        const options = {
          includedRegionCodes: ['in'],
          locationBias: TAMIL_NADU_BIAS,
        };

        if (mode === 'city') {
          options.includedPrimaryTypes = [
            'locality',
            'administrative_area_level_2',
            'administrative_area_level_3',
            'postal_town',
          ];
        }

        const widget = new PlaceAutocompleteElement(options);
        if (placeholder) widget.placeholder = placeholder;

        hostRef.current.replaceChildren(widget);
        widgetRef.current = widget;

        const syncText = (nextValue) => {
          setText(nextValue);
          if (hiddenRef.current) {
            hiddenRef.current.value = nextValue;
          }
        };

        const onInput = () => syncText(readWidgetText(widget));

        widget.addEventListener('input', onInput);
        widget.addEventListener('gmp-select', async ({ placePrediction }) => {
          try {
            const place = placePrediction.toPlace();
            await place.fetchFields({
              fields: ['displayName', 'formattedAddress'],
            });
            const label =
              place.formattedAddress || place.displayName || readWidgetText(widget);
            syncText(label);
          } catch {
            syncText(readWidgetText(widget));
          }
        });

        if (disabled) widget.disabled = true;
      } catch (err) {
        console.warn('Google Places autocomplete unavailable:', err);
        if (!cancelled) setUseFallback(true);
      }
    };

    init();

    return () => {
      cancelled = true;
      widgetRef.current = null;
      hostRef.current?.replaceChildren();
    };
  }, [useFallback, placeholder, mode, disabled]);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.disabled = Boolean(disabled);
    }
  }, [disabled]);

  useEffect(() => {
    const hidden = hiddenRef.current;
    const form = hidden?.form;
    if (!form || useFallback) return undefined;

    const syncBeforeSubmit = () => {
      const next = readWidgetText(widgetRef.current);
      setText(next);
      if (hidden) hidden.value = next;
    };

    form.addEventListener('submit', syncBeforeSubmit);
    return () => form.removeEventListener('submit', syncBeforeSubmit);
  }, [useFallback]);

  if (useFallback) {
    return (
      <input
        type="text"
        name={name}
        className={className}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete="off"
      />
    );
  }

  return (
    <div className={`places-autocomplete-field ${className}`.trim()}>
      <input
        ref={hiddenRef}
        type="text"
        name={name}
        value={text}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="places-autocomplete-hidden"
        readOnly
      />
      <div
        ref={hostRef}
        className={`places-autocomplete-host${disabled ? ' is-disabled' : ''}`}
      />
    </div>
  );
}

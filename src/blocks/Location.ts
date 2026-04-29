import { Field } from 'payload'

export const Location: Field = {
  type: 'collapsible',
  label: 'Location',
  fields: [
    {
      label: '',
      type: 'group',
      name: 'location',
      fields: [
        {
          type: 'number',
          label: 'Latitude',
          name: 'lat',
          required: true,
        },
        {
          type: 'number',
          label: 'Longitude',
          name: 'lon',
          required: true,
        },

        {
          type: 'number',
          label: 'Zoom',
          name: 'zoom',
          required: true,
          defaultValue: 15,
        },
      ],
    },
  ],
}

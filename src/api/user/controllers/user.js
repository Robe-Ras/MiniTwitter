'use server';

import { sanitizeEntity } from 'strapi-utils';
import strapi from 'strapi';

export default {
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    // Assurez-vous que le fichier est bien traité et que l'URL est générée
    if (ctx.request.files && ctx.request.files.profilePicture) {
      const { profilePicture } = ctx.request.files;
      const uploadService = strapi.plugins['upload'].services.upload;
      const uploadedFiles = await uploadService.upload({
        data: {}, // informations supplémentaires
        files: profilePicture, // fichier à télécharger
      });
      if (uploadedFiles && uploadedFiles.length > 0) {
        body.profilePicture = uploadedFiles[0].url; // Assurez-vous que l'URL est bien définie
      }
    }

    const updatedUser = await strapi.services.user.update({ id }, { ...body, totalLikes: newTotalLikes });
    console.log('Updated user:', updatedUser); // Log the updated user
    return sanitizeEntity(updatedUser, { model: strapi.models.user });
  },
};


/**
 * routes/templates.js — Credential Template Manager
 * GET    /api/templates      — list
 * POST   /api/templates      — create
 * PUT    /api/templates/:id  — update
 * DELETE /api/templates/:id  — delete
 */

import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import store from '../data/store.js';

router.get('/', (req, res) => res.json(store.templates));

router.post('/', (req, res) => {
    const { name, fields, description } = req.body;
    if (!name || !fields || !Array.isArray(fields)) {
        return res.status(400).json({ error: 'name (string) and fields (array) are required' });
    }
    const template = { id: uuidv4(), name, description: description || '', fields, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    store.templates.push(template);
    res.status(201).json({ success: true, template });
});

router.put('/:id', (req, res) => {
    const tpl = store.templates.find(t => t.id === req.params.id);
    if (!tpl) return res.status(404).json({ error: 'Template not found' });
    const { name, fields, description } = req.body;
    if (name) tpl.name = name;
    if (fields) tpl.fields = fields;
    if (description !== undefined) tpl.description = description;
    tpl.updatedAt = new Date().toISOString();
    res.json({ success: true, template: tpl });
});

router.delete('/:id', (req, res) => {
    const idx = store.templates.findIndex(t => t.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Template not found' });
    store.templates.splice(idx, 1);
    res.json({ success: true, message: 'Template deleted' });
});

export default router;

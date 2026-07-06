import { Request, Response, NextFunction } from "express";
import { automationService } from "../services/automation.service";
import {
  createAutomationSchema,
  updateAutomationSchema,
} from "../validators/automation.validator";

export const getAutomations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const automations = await automationService.getAutomations(userId);
    res.status(200).json(automations);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAutomation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const automation = await automationService.getAutomation(id, userId);
    res.status(200).json(automation);
    return;
  } catch (error) {
    next(error);
  }
};

export const createAutomation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const plan = (req as any).user.subscription?.plan || "FREE";
    const validated = createAutomationSchema.parse(req.body);
    const automation = await automationService.createAutomation(userId, plan, validated);
    res.status(201).json(automation);
    return;
  } catch (error) {
    next(error);
  }
};

export const updateAutomation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const validated = updateAutomationSchema.parse(req.body);
    const automation = await automationService.updateAutomation(id, userId, validated);
    res.status(200).json(automation);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteAutomation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    await automationService.deleteAutomation(id, userId);
    res.status(200).json({ success: true, message: "Automation deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useModelStore } from "@/store/model"

const MODELS = ['gpt-4', 'gpt-4o', 'gpt-4o-mini']

export function ModelSelect() {
  const { model: currentModel, updateModel } = useModelStore();
  const handleChange = (selectedModel: string) => {
    updateModel(selectedModel);
  }
  console.log('ModelSelect.tsx');
  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] border-none text-xl focus:ring-transparent">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map(model => <SelectItem key={model} value={model} disabled={currentModel === model}>{model}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
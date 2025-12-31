"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

const SPHERE_COLORS = ["bg-green-500", "bg-orange-500", "bg-blue-500", "bg-pink-500"]

export default function MegaSenaPage() {
  const [quantity, setQuantity] = useState(6)
  const [minNumber, setMinNumber] = useState(1)
  const [maxNumber, setMaxNumber] = useState(60)
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([])
  const [copied, setCopied] = useState(false)

  const generateNumbers = () => {
    const qty = Math.min(Math.max(1, quantity), 15)
    const min = Math.max(1, minNumber)
    const max = Math.max(min, maxNumber)

    if (qty > max - min + 1) {
      alert("A quantidade de números não pode ser maior que o intervalo disponível!")
      return
    }

    const numbers = new Set<number>()
    while (numbers.size < qty) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      numbers.add(randomNum)
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b)
    setGeneratedNumbers(sortedNumbers)
  }

  const copyToClipboard = () => {
    const text = generatedNumbers.join(" - ")
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2845] via-[#314e7c] to-[#4a6fa5] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-2">Rad Mega Sena</CardTitle>
          <p className="text-white/80 text-sm md:text-base">Gerador de Números da Sorte</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-white font-medium">
                Quantidade
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="15"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 6)}
                className="bg-white/90 border-white/30 text-gray-900 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minNumber" className="text-white font-medium">
                Menor Número
              </Label>
              <Input
                id="minNumber"
                type="number"
                min="1"
                value={minNumber}
                onChange={(e) => setMinNumber(Number.parseInt(e.target.value) || 1)}
                className="bg-white/90 border-white/30 text-gray-900 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxNumber" className="text-white font-medium">
                Maior Número
              </Label>
              <Input
                id="maxNumber"
                type="number"
                min="1"
                value={maxNumber}
                onChange={(e) => setMaxNumber(Number.parseInt(e.target.value) || 60)}
                className="bg-white/90 border-white/30 text-gray-900 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-2">
            <Button
              onClick={generateNumbers}
              className="bg-[#314e7c] hover:bg-[#253a5c] text-white font-bold text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Gerar Números
            </Button>
          </div>

          {/* Generated Numbers Display */}
          {generatedNumbers.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 py-6">
                {generatedNumbers.map((number, index) => {
                  const colorClass = SPHERE_COLORS[index % SPHERE_COLORS.length]
                  return (
                    <div
                      key={index}
                      className={`${colorClass} w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce-in`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <span className="text-white font-bold text-xl md:text-2xl">{number}</span>
                    </div>
                  )
                })}
              </div>

              {/* Copy Button */}
              <div className="flex justify-center">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-gray-900 border-white/50 backdrop-blur-sm"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Números
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

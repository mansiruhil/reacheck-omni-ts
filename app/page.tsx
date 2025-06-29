"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Link, FileText, ImageIcon, Scan, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"

type DetectionMode = "menu" | "url" | "upload" | "text" | "results"
type ContentType = "image" | "text" | "document" | "webpage"

interface DetectionResult {
  isAI: boolean
  confidence: number
  contentType: ContentType
  analysis: {
    textPatterns?: string[]
    imageArtifacts?: string[]
    metadata?: Record<string, any>
    reasoning: string
  }
  timestamp: Date
}

export default function ReaCheckDetector() {
  const [mode, setMode] = useState<DetectionMode>("menu")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [inputText, setInputText] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "text/*": [".txt", ".md"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  const simulateAnalysis = async (content: string, type: ContentType) => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate progressive analysis
    const steps = [
      "Preprocessing content...",
      "Analyzing patterns...",
      "Checking metadata...",
      "Running AI detection models...",
      "Calculating confidence scores...",
      "Generating report...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnalysisProgress(((i + 1) / steps.length) * 100)
    }

    // Mock AI detection logic
    const aiIndicators = [
      "repetitive sentence structures",
      "unnatural word patterns",
      "generic phrasing",
      "lack of personal voice",
      "perfect grammar consistency",
    ]

    const humanIndicators = [
      "natural writing flow",
      "personal anecdotes",
      "varied sentence length",
      "colloquial expressions",
      "minor grammatical inconsistencies",
    ]

    // Simple heuristic for demo
    const aiScore = Math.random()
    const isAI = aiScore > 0.5
    const confidence = Math.round((isAI ? aiScore : 1 - aiScore) * 100)

    const mockResult: DetectionResult = {
      isAI,
      confidence,
      contentType: type,
      analysis: {
        textPatterns: isAI ? aiIndicators.slice(0, 3) : humanIndicators.slice(0, 3),
        reasoning: isAI
          ? `Content shows ${confidence}% likelihood of AI generation based on pattern analysis, vocabulary consistency, and structural markers.`
          : `Content appears ${confidence}% likely to be human-written based on natural language patterns, personal voice, and authentic inconsistencies.`,
        metadata: {
          wordCount: content.length,
          analysisTime: "2.0s",
          modelVersion: "ReaCheck-model",
        },
      },
      timestamp: new Date(),
    }

    setResult(mockResult)
    setIsAnalyzing(false)
    setMode("results")
  }

  const analyzeText = async () => {
    if (!inputText.trim()) return
    await simulateAnalysis(inputText, "text")
  }

  const analyzeUrl = async () => {
    if (!inputUrl.trim()) return
    // In real implementation, would fetch and analyze URL content
    await simulateAnalysis(`Content from: ${inputUrl}`, "webpage")
  }

  const analyzeFile = async () => {
    if (!uploadedFile) return

    if (uploadedFile.type.startsWith("image/")) {
      await simulateAnalysis(`Image file: ${uploadedFile.name}`, "image")
    } else {
      // For text files, could read content
      await simulateAnalysis(`Document: ${uploadedFile.name}`, "document")
    }
  }

  const BlockButton = ({
    children,
    onClick,
    variant = "default",
    disabled = false,
    className = "",
  }: {
    children: React.ReactNode
    onClick?: () => void
    variant?: "default" | "primary" | "success" | "danger"
    disabled?: boolean
    className?: string
  }) => {
    const variants = {
      default:
        "bg-stone-600 border-stone-400 hover:bg-stone-500 shadow-[0_6px_0_#57534e] hover:shadow-[0_4px_0_#57534e]",
      primary: "bg-blue-600 border-blue-400 hover:bg-blue-500 shadow-[0_6px_0_#1e40af] hover:shadow-[0_4px_0_#1e40af]",
      success:
        "bg-green-600 border-green-400 hover:bg-green-500 shadow-[0_6px_0_#15803d] hover:shadow-[0_4px_0_#15803d]",
      danger: "bg-red-600 border-red-400 hover:bg-red-500 shadow-[0_6px_0_#dc2626] hover:shadow-[0_4px_0_#dc2626]",
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative px-8 py-4 text-white font-bold text-lg border-4 
          transition-all duration-150 hover:scale-[1.02] active:scale-95 active:translate-y-1
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]} ${className}
        `}
        style={{
          fontFamily: "monospace",
          imageRendering: "pixelated",
        }}
      >
        {children}
      </button>
    )
  }

  if (mode === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 flex flex-col items-center justify-center p-4">
        {/* Floating clouds effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-8 bg-white/80 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-10 bg-white/70 rounded-full"></div>
          <div className="absolute top-40 left-1/3 w-12 h-6 bg-white/60 rounded-full"></div>
          <div className="absolute top-16 right-1/3 w-24 h-12 bg-white/75 rounded-full"></div>
        </div>

        <div className="relative z-10 text-center mb-12">
          <h1
            className="text-7xl font-bold text-white mb-4 drop-shadow-lg"
            style={{
              fontFamily: "monospace",
              textShadow: "6px 6px 0px #000000, 3px 3px 0px #333333",
              imageRendering: "pixelated",
            }}
          >
            REACHECK
          </h1>
          <p
            className="text-3xl text-yellow-300 font-bold"
            style={{
              fontFamily: "monospace",
              textShadow: "3px 3px 0px #000000",
            }}
          >
            AI Content Detection Tool
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-4 w-full max-w-lg">
          <BlockButton onClick={() => setMode("text")} variant="primary">
            <FileText className="inline mr-3" size={24} />
            Analyze Text
          </BlockButton>

          <BlockButton onClick={() => setMode("upload")} variant="primary">
            <Upload className="inline mr-3" size={24} />
            Upload File
          </BlockButton>

          <BlockButton onClick={() => setMode("url")} variant="primary">
            <Link className="inline mr-3" size={24} />
            Check URL/Link
          </BlockButton>

          <BlockButton variant="default">
            <ImageIcon className="inline mr-3" size={24} />
            Batch Analysis
          </BlockButton>

          <BlockButton variant="default">
            <Scan className="inline mr-3" size={24} />
            API Access
          </BlockButton>
        </div>

        <div className="relative z-10 mt-8 text-center">
          <p
            className="text-white text-lg font-bold"
            style={{
              fontFamily: "monospace",
              textShadow: "2px 2px 0px #000000",
            }}
          >
            
          </p>
        </div>
      </div>
    )
  }

  if (mode === "text") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 flex flex-col p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-8 bg-white/80 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-10 bg-white/70 rounded-full"></div>
          <div className="absolute top-40 left-1/3 w-12 h-6 bg-white/60 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{
                fontFamily: "monospace",
                textShadow: "4px 4px 0px #000000",
              }}
            >
              Text Analysis
            </h2>
            <p
              className="text-white text-xl font-bold"
              style={{
                fontFamily: "monospace",
                textShadow: "2px 2px 0px #000000",
              }}
            >
              Paste any text content to check if it's AI generated
            </p>
          </div>

          <Card className="p-8 bg-stone-700/95 border-4 border-stone-500 mb-6 shadow-[0_8px_0_#57534e]">
            <Textarea
              placeholder="Paste your text here... (articles, emails, social media posts, etc.)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[250px] bg-stone-800 border-4 border-stone-600 text-white text-lg p-4"
              style={{ fontFamily: "monospace" }}
            />

            <div className="flex justify-between items-center mt-6">
              <p className="text-stone-300 text-lg font-bold" style={{ fontFamily: "monospace" }}>
                Characters: {inputText.length}
              </p>

              <div className="flex gap-4">
                <BlockButton onClick={() => setMode("menu")}>← Back</BlockButton>
                <BlockButton onClick={analyzeText} variant="success" disabled={!inputText.trim() || isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : "Analyze Text"}
                </BlockButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (mode === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 flex flex-col p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-8 bg-white/80 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-10 bg-white/70 rounded-full"></div>
          <div className="absolute top-40 left-1/3 w-12 h-6 bg-white/60 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{
                fontFamily: "monospace",
                textShadow: "4px 4px 0px #000000",
              }}
            >
              Upload
            </h2>
            <p
              className="text-white text-xl font-bold"
              style={{
                fontFamily: "monospace",
                textShadow: "2px 2px 0px #000000",
              }}
            >
              Upload images, documents or text files for AI detection
            </p>
          </div>

          <Card className="p-8 bg-stone-700/95 border-4 border-stone-500 mb-6 shadow-[0_8px_0_#57534e]">
            <div
              {...getRootProps()}
              className={`
                border-4 border-dashed border-stone-400 rounded-lg p-16 text-center cursor-pointer
                transition-all duration-200 bg-stone-800/50
                ${isDragActive ? "border-blue-400 bg-blue-900/30 scale-105" : "hover:border-stone-300 hover:bg-stone-800/70"}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-6 text-stone-300" size={64} />

              {uploadedFile ? (
                <div className="text-white" style={{ fontFamily: "monospace" }}>
                  <p className="text-2xl font-bold mb-3">File Selected:</p>
                  <p className="text-blue-300 text-xl">{uploadedFile.name}</p>
                  <p className="text-lg text-stone-300 mt-3">Size: {(uploadedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div className="text-white" style={{ fontFamily: "monospace" }}>
                  <p className="text-2xl font-bold mb-3">
                    {isDragActive ? "Drop files here..." : "Drag & drop files here"}
                  </p>
                  <p className="text-stone-300 text-lg">Supports: Images, PDFs, Word docs, Text files</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="text-stone-300 text-lg font-bold" style={{ fontFamily: "monospace" }}>
                Max file size: 10MB
              </div>

              <div className="flex gap-4">
                <BlockButton onClick={() => setMode("menu")}>← Back</BlockButton>
                <BlockButton onClick={analyzeFile} variant="success" disabled={!uploadedFile || isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : "Analyze File"}
                </BlockButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (mode === "url") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 flex flex-col p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-8 bg-white/80 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-10 bg-white/70 rounded-full"></div>
          <div className="absolute top-40 left-1/3 w-12 h-6 bg-white/60 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{
                fontFamily: "monospace",
                textShadow: "4px 4px 0px #000000",
              }}
            >
              URL Analysis
            </h2>
            <p
              className="text-white text-xl font-bold"
              style={{
                fontFamily: "monospace",
                textShadow: "2px 2px 0px #000000",
              }}
            >
              Enter any website URL to analyze its content for AI generation
            </p>
          </div>

          <Card className="p-8 bg-stone-700/95 border-4 border-stone-500 mb-6 shadow-[0_8px_0_#57534e]">
            <div className="space-y-6">
              <Input
                placeholder="https://example.com/article"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="bg-stone-800 border-4 border-stone-600 text-white text-xl h-16 px-4"
                style={{ fontFamily: "monospace" }}
              />

              <div className="text-stone-300 text-lg font-bold" style={{ fontFamily: "monospace" }}>
                <p>Supported: News articles, blog posts, social media, forums</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="text-stone-300 text-lg font-bold" style={{ fontFamily: "monospace" }}>
                Analysis includes: Text content, images, metadata
              </div>

              <div className="flex gap-4">
                <BlockButton onClick={() => setMode("menu")}>← Back</BlockButton>
                <BlockButton onClick={analyzeUrl} variant="success" disabled={!inputUrl.trim() || isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : "Analyze URL"}
                </BlockButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (mode === "results" && result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 flex flex-col p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-8 bg-white/80 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-10 bg-white/70 rounded-full"></div>
          <div className="absolute top-40 left-1/3 w-12 h-6 bg-white/60 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{
                fontFamily: "monospace",
                textShadow: "4px 4px 0px #000000",
              }}
            >
              Detection Results
            </h2>
          </div>

          {isAnalyzing ? (
            <Card className="p-12 bg-stone-700/95 border-4 border-stone-500 text-center shadow-[0_8px_0_#57534e]">
              <div className="text-white mb-8" style={{ fontFamily: "monospace" }}>
                <Scan className="mx-auto mb-6 animate-spin" size={64} />
                <h3 className="text-2xl font-bold mb-6">Analyzing Content...</h3>
                <Progress value={analysisProgress} className="mb-6 h-4" />
                <p className="text-stone-300 text-lg">Running advanced AI detection models</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Main Result */}
              <Card className="p-10 bg-stone-700/95 border-4 border-stone-500 shadow-[0_8px_0_#57534e]">
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center gap-4 text-4xl font-bold mb-6 ${
                      result.isAI ? "text-red-400" : "text-green-400"
                    }`}
                    style={{
                      fontFamily: "monospace",
                      textShadow: "3px 3px 0px #000000",
                    }}
                  >
                    {result.isAI ? (
                      <>
                        <XCircle size={48} />
                        AI GENERATED
                      </>
                    ) : (
                      <>
                        <CheckCircle size={48} />
                        HUMAN CREATED
                      </>
                    )}
                  </div>

                  <div
                    className="text-white text-2xl font-bold mb-6"
                    style={{
                      fontFamily: "monospace",
                      textShadow: "2px 2px 0px #000000",
                    }}
                  >
                    Confidence: {result.confidence}%
                  </div>

                  <Badge variant="outline" className="text-xl px-6 py-3 border-4 border-stone-400 bg-stone-600">
                    {result.contentType.toUpperCase()}
                  </Badge>
                </div>

                <div className="bg-stone-800/70 rounded border-4 border-stone-600 p-6 mb-8">
                  <h4 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "monospace" }}>
                    Analysis Summary:
                  </h4>
                  <p className="text-stone-200 text-lg leading-relaxed" style={{ fontFamily: "monospace" }}>
                    {result.analysis.reasoning}
                  </p>
                </div>

                {/* Detected Patterns */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "monospace" }}>
                      Key Indicators:
                    </h4>
                    <div className="space-y-3">
                      {result.analysis.textPatterns?.map((pattern, index) => (
                        <div key={index} className="flex items-center gap-3 text-stone-200 text-lg">
                          <AlertTriangle size={20} className="text-yellow-400" />
                          <span style={{ fontFamily: "monospace" }}>{pattern}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "monospace" }}>
                      Metadata:
                    </h4>
                    <div className="space-y-2 text-stone-200 text-lg" style={{ fontFamily: "monospace" }}>
                      <p>Analysis Time: {result.analysis.metadata?.analysisTime}</p>
                      <p>Model Version: {result.analysis.metadata?.modelVersion}</p>
                      <p>Processed: {new Date(result.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex justify-center gap-6">
                <BlockButton onClick={() => setMode("menu")} variant="default">
                  ← Main Menu
                </BlockButton>
                <BlockButton
                  onClick={() => {
                    setResult(null)
                    setInputText("")
                    setInputUrl("")
                    setUploadedFile(null)
                    setMode("menu")
                  }}
                  variant="primary"
                >
                  New Analysis
                </BlockButton>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

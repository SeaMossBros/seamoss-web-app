import React, { useRef, useState } from 'react'
import { Button, FileInput, Group, Image, Textarea, TextInput } from '@mantine/core'
import { Blog, ContentBlock, ImageBlock, TextBlock } from '@/types/Blog'
import './BlogForm.css'

interface BlogFormProps {
  onSubmit: (blogData: Blog) => void
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit }) => {
  const [Blog, setBlog] = useState<Blog>({
    id: null,
    profilePic: null,
    firstName: '',
    lastName: '',
    title: '',
    mainImage: null,
    profile_pic_preview: '',
    main_image_preview: '',
    body: [],
  })
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const fileInputRefs = useRef(new Map())

  const handleProfileImageChange = (file: File | null) => {
    setBlog((prev) => ({
      ...prev,
      profilePic: file,
      profile_pic_preview: file ? URL.createObjectURL(file) : '',
    }))
  }

  const handleMainImageChange = (file: File | null) => {
    setBlog((prev) => ({
      ...prev,
      mainImage: file,
      main_image_preview: file ? URL.createObjectURL(file) : '',
    }))
  }

  const handleAddSectionTitleBlock = () => {
    setContentBlocks([...contentBlocks, { type: 'sectionTitle', content: '' }])
  }

  const handleAddTextBlock = () => {
    setContentBlocks([...contentBlocks, { type: 'text', content: '' }])
  }

  const handleAddImageBlock = () => {
    setContentBlocks([...contentBlocks, { type: 'image', file: null }])
  }

  const handleTextChange = (index: number, text: string) => {
    const newBlocks = [...contentBlocks]
    ;(newBlocks[index] as TextBlock).content = text
    setContentBlocks(newBlocks)
  }

  const handleImageChange = (index: number, file: File | null) => {
    const newBlocks = [...contentBlocks]
    ;(newBlocks[index] as ImageBlock).file = file
    setContentBlocks(newBlocks)

    // Reset the file input
    if (fileInputRefs.current.has(index)) {
      const fileInput = fileInputRefs.current.get(index)
      if (fileInput) {
        fileInput.value = '' // Reset the file input value
      }
    }
  }

  const handleSubmit = () => {
    onSubmit({
      ...Blog,
      body: contentBlocks,
    })
    setBlog((prev) => ({
      ...prev,
      profilePic: null,
      firstName: '',
      lastName: '',
      title: '',
      mainImage: null,
      profile_pic_preview: '',
      main_image_preview: '',
      body: [],
    }))
    setContentBlocks([])
  }

  const adjustTextAreaHeight = (event: any) => {
    event.target.style.height = 'auto' // Reset height to recalculate
    event.target.style.height = `${event.target.scrollHeight}px` // Set new height
  }

  const isImageBlock = (block: ContentBlock): block is ImageBlock => {
    return block.type === 'image'
  }

  const renderContentBlock = (block: ContentBlock, index: number) => {
    let component = null
    switch (block.type) {
      case 'text':
        component = (
          <Textarea
            key={index}
            placeholder="Enter text"
            value={block.content}
            onChange={(event) => {
              handleTextChange(index, event.target.value)
              adjustTextAreaHeight(event)
            }}
            className="inputLabel textArea"
            minRows={2} // Minimum number of rows
            maxRows={12} // Maximum number of rows
          />
        )
        break
      case 'sectionTitle':
        component = (
          <TextInput
            key={index}
            placeholder="Enter section title"
            value={block.content}
            onChange={(event) => {
              handleTextChange(index, event.target.value)
              adjustTextAreaHeight(event)
            }}
            className="inputLabel textInput"
          />
        )
        break
      case 'image':
        if (isImageBlock(block)) {
          component = (
            <div key={index} className="imageBlock">
              <FileInput
                ref={(el) => fileInputRefs.current.set(index, el)}
                onChange={(file) => handleImageChange(index, file)}
                className="img-inputLabel"
                placeholder={block.file ? 'Replace Image' : 'Upload Image'}
              />
              {block.file && (
                <Image
                  src={URL.createObjectURL(block.file) || '/images/placeholder.webp'}
                  alt="Preview"
                  className="imagePreview"
                />
              )}
            </div>
          )
        }
        break
      default:
        return null
    }

    return (
      <div key={index} className="contentBlock">
        {/* Existing rendering logic for different block types */}
        {component}
        {/* Delete and Move buttons */}
        <div className="content-actions">
          <div className="content-mover-arrows">
            <Button
              className="content-button"
              onClick={() => moveBlockUp(index)}
              disabled={index === 0}
            >
              ↑
            </Button>
            <Button
              className="content-button"
              onClick={() => moveBlockDown(index)}
              disabled={index === contentBlocks.length - 1}
            >
              ↓
            </Button>
          </div>
          <Button
            className="content-button remove-text-field"
            c={'red'}
            color={'transparent'}
            onClick={() => handleRemoveBlock(index)}
          >
            X
          </Button>
        </div>
      </div>
    )
  }

  const handleRemoveBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index))
  }

  const moveBlockUp = (index: number) => {
    if (index === 0) return
    const newBlocks = [...contentBlocks]
    ;[newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]]
    setContentBlocks(newBlocks)
  }

  const moveBlockDown = (index: number) => {
    if (index === contentBlocks.length - 1) return
    const newBlocks = [...contentBlocks]
    ;[newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]]
    setContentBlocks(newBlocks)
  }

  return (
    <div className="blogForm">
      {/* Static Fields */}
      <FileInput
        label="Profile Picture"
        placeholder="Upload Image"
        onChange={handleProfileImageChange}
        className="article-profile-pic img-inputLabel"
      />
      {Blog.profile_pic_preview && (
        <Image
          src={Blog.profile_pic_preview}
          alt="Profile Preview"
          className="profileImagePreview"
        />
      )}
      <TextInput
        label="First Name"
        placeholder="Enter first name"
        value={Blog.firstName}
        onChange={(event) => {
          console.log(event) // Add this line to debug
          setBlog((prev) => ({ ...prev, firstName: event.target.value }))
        }}
        className="inputLabel textInput"
      />
      <TextInput
        label="Last Name"
        placeholder="Enter last name (optional)"
        value={Blog.lastName}
        onChange={(event) => setBlog((prev) => ({ ...prev, lastName: event.target.value }))}
        className="inputLabel textInput"
      />
      <TextInput
        label="Article Title"
        placeholder="Enter article title"
        value={Blog.title}
        onChange={(event) => setBlog((prev) => ({ ...prev, title: event.target.value }))}
        className="inputLabel textInput"
      />
      {/* // TODO: clean up so the file names don't show after adding an image */}
      <FileInput
        label="Main Article Image"
        placeholder="Upload Image"
        onChange={handleMainImageChange}
        className="img-inputLabel"
      />
      {Blog.main_image_preview && (
        <Image
          src={Blog.main_image_preview || '/images/placeholder.webp'}
          alt="Main Article Preview"
          className="main_image_preview"
        />
      )}

      {/* Dynamic Content Blocks */}
      {contentBlocks.map((block, index) => renderContentBlock(block, index))}

      {/* Action buttons */}
      <Group mt="md" className="buttonGroup">
        <Button c={'secondary-gray'} variant={'default'} onClick={handleAddSectionTitleBlock}>
          Add Section Title
        </Button>
        <Button c={'primary-green'} variant={'outline'} onClick={handleAddTextBlock}>
          Add Text Block
        </Button>
        <Button c={'secondary-blue'} variant={'subtle'} onClick={handleAddImageBlock}>
          Add Image Block
        </Button>
        {/* // TODO: Add tags */}
        <Button onClick={handleSubmit} className="submitButton">
          Publish Article
        </Button>
      </Group>
    </div>
  )
}

export default BlogForm
